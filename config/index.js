'use strict';

var path        = require('path'),
    rootPath    = path.normalize(__dirname + '/..');

module.exports  = {
    root: rootPath,
    http: {
        port: 8000
    },
    facebookLogin: {
      clientID: '921963694546058',
      clientSecret: '47a73802be02e9527ebf9eab3b6e991a'
    },
    publicPath: rootPath + '/public/public'
}
