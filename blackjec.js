var prompt = require('prompt');
var fs = require('fs');
require('sugar')();

// var card1 = random();
// var card2 = random();
// var card3 = random();
// var card4 = random();
// var card5 = random();

var arr = Array.create([random(),random(),random(),random()]);

var sum = arr.reduce(function(a,b){
		return a+b;
	});

var scheme = {
	properties: {
		action: {
			description: 'Начать игру нажмите "Y"',
			pattern: /^[Y\s\-]+$/,
			message: 'Попробуйте правильно набрать "Y" и нажать на Enter',
			require: true
		}
	}
};


prompt.start();

prompt.get(scheme, function(err, result){
	console.log('Вышло: '+arr[0]+' '+arr[1]+' '+arr[2]+' '+arr[3]);
	if (sum == 21) {
		console.log(sum+' очков. Вы выйграли');
		log(true);
	} else {
		console.log(sum+' очков. Вы проиграли');
		log(false);
	}
	
});

function random(){
	return Number.random(2, 11);
}

function log(result){
	fs.appendFile('log_BlackJec.txt', result+'\n', 'utf8', (err) => {
		if (err) throw err;
	});
}