var fs = require('fs');
require('sugar')();

fs.readFile('log_BlackJec.txt', function(err, data){
	if (err) throw err;
	var p = data.toString().split('\n');
	var count = p.length;
	var win = p.count(/true/);
	var lost = p.count(/false/);
	console.log(p);
	console.log('Количество игр было: '+ count);
	console.log('Выйграно: '+ win +' игр, проигранных: '+ lost);
})