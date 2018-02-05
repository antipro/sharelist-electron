const electron = require('electron')
const settings = require('electron-settings')
const electronLocalshortcut = require('electron-localshortcut')
const i18n = require('./locale.js')

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const Tray = electron.Tray
let mainWindow, tray

function setShortcut (oldShortcut, newShortcut) {
  electron.globalShortcut.unregister('CmdOrCtrl+Alt+Shift+' + oldShortcut)
  electron.globalShortcut.register('CmdOrCtrl+Alt+Shift+' + newShortcut, () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })
}

const ipc = electron.ipcMain

ipc.on('preference-message', function (event, ref) {
  let oldShortcut = settings.get('ref').shortcut || 'S'
  settings.set('ref', ref)
  setShortcut(oldShortcut, ref.shortcut)

  let locale = settings.get('locale')
  electron.dialog.showMessageBox(mainWindow, {
    type: 'none',
    buttons: [ i18n(locale, 'yes') ],
    title: '',
    message: i18n(locale, 'preference_saved')
  })
})

ipc.on('locale-message', function (event, locale) {
  settings.set('locale', locale)
  event.sender.send('locale-reply')
})
ipc.on('preference-get-message', function (event) {
  let ref = settings.get('ref')
  if (ref === undefined) {
    ref = {
      starup_hidden: false,
      shortcut: 'S'
    }
  }
  event.sender.send('preference-get-reply', ref)
})

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

function createWindow () {
  if (settings.get('ref') === undefined) {
    settings.set('ref', {
      starup_hidden: false,
      shortcut: 'S'
    })
  }
  
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 600,
    title: '',
    frame: true,
    show: !settings.get('ref.starup_hidden'),
    icon: path.join(__dirname, 'www/static/tray.png')
  })

  mainWindow.setMenu(null)

  electron.globalShortcut.register('CmdOrCtrl+Alt+Shift+' + (settings.get('ref').shortcut || 'S'), () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })
  electronLocalshortcut.register(mainWindow, 'F12', () => {
    mainWindow.webContents.openDevTools()
  })

  const isDev = require('electron-is-dev');

  if (isDev) {
    mainWindow.loadURL(url.format({
      pathname: 'localhost:8080',
      protocol: 'http:',
      slashes: true
    }))
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'www/index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('close', function (e) {
    let locale = settings.get('locale')
    var choice = electron.dialog.showMessageBox(this, {
      type: 'none',
      buttons: [ i18n(locale, 'no'), i18n(locale, 'yes') ],
      title: '',
      message: i18n(locale, 'confirm_to_exit'),
      cancelId: 0
    })
    if (choice === 0) {
      e.preventDefault()
    }
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  const iconPath = path.join(__dirname, 'www/static/tray.png')
  tray = new Tray(iconPath)
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

require('./update.js')

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
