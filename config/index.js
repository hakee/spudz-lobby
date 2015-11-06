'use strict';

var path        = require('path'),
    rootPath    = path.normalize(__dirname + '/..');

module.exports  = {
    root: rootPath,
    http: {
        port: 8000
    },
    publicPath: rootPath + '/public'
}