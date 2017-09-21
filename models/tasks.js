<<<<<<< HEAD
let pool = require('../config/config');

let Tasks = {
    create: function(){
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection){
                if (err) reject(err);
                return;

                pool.query('INSERT INTO tasks SET ?',
                    post,
                    function(err, rows){
                        if (err || !rows){
                            reject(err);
                            return;
                        }

                        resolve(rows);
                        pool.release();
                    });
            });
        });
    },

    delet: function(id){
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection){
                if (err) reject(err);
                return;

                pool.query('DELETE INTO tasks SET ?',
                    post,
                    function(err, rows){
                        if (err || !rows){
                            reject(err);
                            return;
                        }

                        resolve(rows);
                        pool.release();
                    });
            });
        });
    },

    update: function(id){
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection){
                if (err) reject(err);
                return;

                pool.query('UPDATE INTO tasks SET ?',
                    post,
                    function(err, rows){
                        if (err || !rows){
                            reject(err);
                            return;
                        }

                        resolve(rows);
                        pool.release();
                    });
            });
        });
    },

    list: function(){
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection){
                if (err) reject(err);
                return;

                pool.query('SELECT * FROM tasks',
                    function(err, rows){
                        if (err || !rows){
                            reject(err);
                            return;
                        }

                        resolve(rows);
                        pool.release();
                    });
            });
        });
    }
=======
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
>>>>>>> 06c0e358c6542b743492ff9ffbb8e31e92b8010c
};

module.exports = Tasks;