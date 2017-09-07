var prompt = require('prompt');
var fs = require('fs');

var max = 2, min = 1;
var eagle = Math.floor(Math.random() * (max-min+1))+min;

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
	fs.appendFile('log.txt', '{ result: ' + message +'},\n', 'utf8', (err) => {
		if (err) throw err;
	});
}