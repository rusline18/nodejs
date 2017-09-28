/* eslint-disable quotes */
let mysql = require('mysql');

let config = mysql.createPool({
	host		: '127.0.0.1',
	user		: 'root',
	password	: '',
	database	: 'tasks'
});

module.exports = config;