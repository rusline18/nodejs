var prompt = require('prompt');

var max = 2, min = 1;
var eagle = Math.floor(Math.random() * (max-min+1))+min;

prompt.start();

var schema = {
    properties: {
      choise: {
      	description: 'Угадайте число из 1 или 2',
        pattern: /^[0-2\s\-]+$/,
        message: 'Вы неправильно указали значение',
        required: true
      }
    }
  };

prompt.get(schema, function(err, result){
	if (result.choise == eagle) {
		console.log('Вы угадали');
	} else {
		console.log('Вы не угадали');
	}
})