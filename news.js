const request = require('request');
const cheerio = require('cheerio');
const http = require('http');


let url = request('http://www.yiiframework.com/', function(error, response, html){
	if (!error && response.statusCode == 200) {
		let $ = cheerio.load(html);
		$('.news-item').each(function(i, element){
			let cols = $(this).find('div');
			console.log(
				'\n'+cols.eq(1).text()
				+'\n'+cols.eq(2).text()
				+'\n'+cols.eq(0).text()
			);
		});
	} else {
		console.log('Произошла ошибка!');
	}
});