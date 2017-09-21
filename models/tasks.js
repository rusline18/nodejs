let pool = require('../config/config');
global.Promise = require('bluebird');

let Tasks = {
    create: function(){
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection){
                if (err) reject(err);
                return;

                connection.query('INSERT INTO tasks SET ?',
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
        }).then(
            error => {
                console.log(error);
            }
        );
    },

    delet: function(id){
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection){
                if (err) reject(err);
                return;

                connection.query('DELETE INTO tasks SET ?',
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
        }).then(
            error => {
                console.log(error);
            }
        );
    },

    update: function(id){
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection){
                if (err) reject(err);
                return;

                connection.query('UPDATE INTO tasks SET ?',
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
        }).then(
            error => {
                console.log(error);
            }
        );
    },

    list: function(){
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection){
                if (err) console.log(reject(err));
                return;

                connection.query('SELECT * FROM tasks',
                    function(err, rows){
                        if (err || !rows){
                            reject(err);
                            return;
                        }

                        resolve(rows);//Здесь надо так выводить или как-то по другому?
                        pool.release();
                    });
            });
        }).then(
            error => {
                console.log(error);
            }
        );
    }
};

module.exports = Tasks;