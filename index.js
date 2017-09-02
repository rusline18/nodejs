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
			cursor.green();
			console.log(answer, '- это правильный ответ');
			cursor.fg.reset();
			break;
		default:
			cursor.beep();
			cursor.red();
			console.log(answer, '-ошибочное мнение');
			cursor.fg.reset();
			console.log('Попробуйте еще раз');
	}
	rl.close();
} );
rl.write('Да');