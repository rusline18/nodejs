let pool = require(__dirname + '/../config.js');

let Tasks = {
	create: function(callback){
		pool.getConnection(function(err, connection){
			pool.query('INSERT INTO tasks SET ?'
				post,
				function(err, rows){
				pool.release();
			});
		});
	},

	delet: function(id, callback){
		pool.getConnection(function(err, connection){
			pool.query('UPDATE INTO tasks SET id = ?'
				[id],
				function(err, rows){
				pool.release();
			});
		});
	},

	update: function(id, callback){
		pool.getConnection(function(err, connection){
			pool.query('UPDATE INTO tasks SET id = ?'
				post,
				function(err, rows){
				pool.release();
			});
		});
	},

	list: function(callback){
		pool.getConnection(function(err, connection){
			pool.query('SELECT * FROM tasks',
				function(err, rows){
				pool.release();
			});
		});
	}
};

module.exports = Tasks;