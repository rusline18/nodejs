let mysql = require('mysql');

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