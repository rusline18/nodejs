let pool = require('../config/config');
global.Promise = require('bluebird');

let Tasks = {
    list: function(){
        return requestTask('SELECT * FROM tasks');
    },
    create: function(task){
        return requestTask('INSERT INTO tasks SET ?', task);
    },
    update: function(id, task){
        return requestTask(`UPDATE tasks SET ? WHERE id = ${id}`, task);
    },
    delete: function(id){
        return requestTask(`DELETE FROM tasks WHERE id = ${id}`);
    },
    getId: function(id){
        return requestTask(`SELECT * FROM tasks WHERE id = ${id}`);
    }
};

function requestTask(sql, task = null){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) throw reject(err);

                connection.query(sql,
                    task,
                    function(err, rows){
                        if (err || !rows){
                            reject(err);
                        }

                        resolve(rows);
                        connection.release();
                    });
            });
        })
    }

module.exports = Tasks;