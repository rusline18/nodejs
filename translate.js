const urlutil = require('url');
const request = require('request');
require('sugar')();

let api = 'trnsl.1.1.20170909T160756Z.4e251c772df9516f.c53e881e08e3ae6c9a69fe7c5efb45390115c26f';
let text = 'Hello world';

request(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${api}&text=${text}&lang=en-ru&format=plain`, function(error, response, body){
	if (!error && response.statusCode == 200) {
		let jsonParse = JSON.parse(body);
		let textTranslate = jsonParse.text.at(0);
		console.dir(textTranslate);
	}
})