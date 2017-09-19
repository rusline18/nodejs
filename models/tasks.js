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
};

module.exports = Tasks;