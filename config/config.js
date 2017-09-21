let mysql = require('mysql');

<<<<<<< HEAD
let config = mysql.createPool({
    host		: '127.0.0.1',
    user		: 'root',
    password	: null,
    database	: 'tasks'
});

module.exports = config;
=======
let pool = mysql.createPool({
	host		: '127.0.0.1',
	user		: 'root',
	password	: null,
	database	: 'tasks'
});

pool.connect(function(err){
	if (err) {
		console.error(err);
	};
});
>>>>>>> 06c0e358c6542b743492ff9ffbb8e31e92b8010c
