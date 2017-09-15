let express = require('express')
    , templating = require('consolidate')
    , bodyParser = require('body-parser')
    , app = express()
    , request = require('request')
    , cheerio = require('cheerio');
require('sugar')();

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/../views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

request('https://nix-tips.ru/tag/yii2', function (err, respons, html) {
    if (!err && respons.statusCode === 200){
        let $ = cheerio.load(html);
        $('article').each(function(i, element){
            let title = $(this).find('.entry-title');
            let date = $(this).find('.entry-date');
            let content = $(this).find('p');
            let arr = [];
            while (date < 50){
                arr.add(date);
            }
            app.get('/', function(req, res){
                res.render('main', {
                    header: 'Новости по yii2',
                    date: $(date).text(),
                    title: $(title).text(),
                    content: $(content).text(),
                });
            });
        });
    } else {
        console.log('Произошла ошибка!');
    }
});

app.listen(8888, function () {
    console.log('Сервер запущен');
});