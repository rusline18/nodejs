let pool = require('../config/config');
global.Promise = require('bluebird');

let Tasks = {
    list: function(){
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err, connection){
                if (err) console.log(reject(err));

                connection.query('SELECT * FROM tasks',
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
};

module.exports = Tasks;