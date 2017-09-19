let mysql = require('mysql');

let config = mysql.createPool({
    host		: '127.0.0.1',
    user		: 'root',
    password	: null,
    database	: 'tasks'
});

module.exports = config;