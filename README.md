# Sharelist

> A todo list application with sharing mechanism via email.
> This is only a wrapper.
> Only test in linux.

## Related Project

* [sharelist-client](https://github.com/antipro/sharelist-client)
  > client program
* [sharelist-server](https://github.com/antipro/sharelist-server)
  > server-side program
* [sharelist-cordova](https://github.com/antipro/sharelist-cordova)
  > cordova wrapper

## Preparation

build or start client program according to guide of [sharelist-client](https://github.com/antipro/sharelist-client)

## Build Setup

``` bash
# install electron
npm install electron

# install dependencies
npm install

# make a 'www' soft link to dist folder of sharelist-client
ln -s <path to sharelist-client/dist> www

# run electron in dev mode(load localhost:8080 default)
npm start

# build electron linux package in dist folder(load local www folder default)
# prerequirement
npm install -g electron-packager
## for windows
npm install -g electron-installer-windows
## for linux deb
npm install -g electron-installer-debian
## for mac dmg
npm install -g electron-installer-dmg

## for windows
npm run windows

electron-installer-windows --src dist/sharelist-win32-x64/ --dest dist/installers/

## for linux
npm run linux
npm run deb64

## for macos
npm run osx
npm run dmg
```
Maybe someone can help me to add windows and mac package :)

## Preview
### Desktop(Deepin Linux)

![Desktop](http://onmdsye1w.bkt.clouddn.com/sharelist-electron2.png)