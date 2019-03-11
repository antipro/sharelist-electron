/**
 * comapre localVersion and latestVersion
 * @param {string} latestVersion 
 */
function compareVersion (latestVersion) {
  const path = require('path')
  const fs = require('fs')
  fs.readFile(path.join(__dirname, 'package.json'), 'UTF-8', (err, data) =>{
    let metaInfo = JSON.parse(data)
    let localVersion = metaInfo.version + '-' + metaInfo.revision
    console.log('latest version:', latestVersion)
    console.log('local version:', localVersion)
    if (localVersion >= latestVersion) {
      return
    }
    const { shell, app } = require('electron')
    const i18n = require('./locale.js')
    const settings = require('electron-settings')
    let locale = settings.get('locale')
    if (locale === undefined) {
      locale = app.getLocale()
    }
    var choice = require('electron').dialog.showMessageBox({
      type: 'none',
      buttons: [ i18n(locale, 'no'), i18n(locale, 'yes') ],
      title: '',
      message: i18n(locale, 'update_existed'),
      cancelId: 0
    })
    if (choice === 1) {
      let packageName = 'sharelist_' + latestVersion.split('-')[0] + '_amd64.deb'
      let isWin = /^win/.test(process.platform)
      if (isWin) {
        packageName = 'sharelist_' + latestVersion.split('-')[0] + '_x64.exe'
      }
      shell.openExternal('https://antipro.gitee.io/sharelist/releases/' + packageName)
    }
  })
}

var https = require('https')

https.get('https://antipro.gitee.io/sharelist/releases/version', (req, res) => {
  let latestVersion = ''
  req.on('data', function (data) {
    latestVersion += data
  })
  req.on('end', function () {
    compareVersion(latestVersion)
  })
})