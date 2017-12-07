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

## Build Setup

``` bash
# install electron
npm install electron

# install dependencies
npm install

# make a 'www' soft link to dist folder of sharelist-client
ln -s <path to sharelist-client/dist> www

# run electron
npm start
