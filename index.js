const readline = require('readline');
const ansi = require('ansi');
const cursor = ansi(process.stdout);

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question('node js это круто? ', (answer) => {
	switch (answer.toLowerCase()){
		case 'да':
		case 'yes':
			answerUser(true, answer);
			break;
		default:
			answerUser(false, answer);
			break;
	}
	rl.close();
} );
rl.write('Да');

function answerUser(bool, answer){
	if (bool == true) {
		cursor.green();
		console.log(answer, '- это правильный ответ');
		cursor.fg.reset();
	} else {
		cursor.beep();
		cursor.red();
		console.log(answer, '-ошибочное мнение');
		cursor.fg.reset();
		console.log('Попробуйте еще раз');
	}
}