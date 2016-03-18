'use strict';

const config    = require(__dirname + '/../config/config');
const mysql     = require('mysql');

module.exports  = mysql.createConnection(config.DB);
