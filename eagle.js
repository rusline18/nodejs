var prompt = require('prompt');
var fs = require('fs');
var sugar = require('sugar');

var eagle = sugar.Number.random(1, 2);

prompt.start();

var schema = {
    properties: {
      choise: {
      	description: 'Угадайте число из 1 или 2',
        pattern: /^[1-2\s\-]+$/,
        message: 'Вы неправильно указали значение',
        required: true
      }
    }
  };

prompt.get(schema, function(err, result){
	if (result.choise == eagle) {
		console.log('Вы угадали');
		writeLog(true);
	} else {
		console.log('Вы не угадали');
		writeLog(false);
	}
});

function writeLog(message){
	fs.appendFile('log.txt', message+'\n', 'utf8', (err) => {
		if (err) throw err;
	});
}