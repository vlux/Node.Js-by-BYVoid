//P109

var setting = require('../setting');
var Db = require('mongodb').Db;
var connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new Db(setting.db,new Server(setting.host,Connection.DEFAULT_PORT,{}));
