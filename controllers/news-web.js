let express = require('express')
    , templating = require('consolidate')
    , bodyParser = require('body-parser')
    , app = express()
    , request = require('request')
    , cheerio = require('cheerio');

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/../views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

request('https://nix-tips.ru/tag/yii2', function (err, respons, html) {
    if (!err && respons.statusCode === 200){
        let $ = cheerio.load(html);
        $('article').each(function(i, element){
            let tag = new Array();
            let cols = $(this).find('div');
            app.get('/', function(req, res){
                res.render('main', {
                    header: 'Новости по yii2',
                    tag: cols.eq(0).text(),
                    date: cols.eq(1).text(),
                    content: cols.eq(2).text(),
                });
            });
        });
    }
});

app.listen(8888, function () {
    console.log('Сервер запущен');
});

function post($cols){
    return [
        {
            title: $cols.eq(0).text(),
            content: $cols.eq(2).text(),
        }
    ]
}