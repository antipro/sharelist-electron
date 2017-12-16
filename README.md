# Sharelist

> A todo list application with share function accross telephone number.
> This is only a wrapper.
> Only test in linux.

## Related Project

* [sharelist-client](https://gitee.com/antipro/sharelist-client)
  > client program
* [sharelist-server](https://gitee.com/antipro/sharelist-server)
  > server-side program
* [sharelist-cordova](https://gitee.com/antipro/sharelist-cordova)
  > cordova wrapper

## Preparation

build or start client program according to guide of [sharelist-client](https://gitee.com/antipro/sharelist-client)

## Build Setup

``` bash
# install electron
npm install electron

# install dependencies
npm install

# make a 'www' soft link to dist folder of sharelist-client
ln -s <path to sharelist-client/dist> www

# run electron in dev mode
npm start

# build electron linux package
npm run linux

# generate deb package
npm run deb64
```

## Preview
### Desktop(Deepin Linux)

![Desktop](http://onmdsye1w.bkt.clouddn.com/sharelist-electron.png)