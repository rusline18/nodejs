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
app.use(bodyParser.urlencoded({extended: true}));

request('https://nix-tips.ru/tag/yii2', function (err, respons, html) {
    if (!err && respons.statusCode === 200){
        let $ = cheerio.load(html);
        $('article').each(function(i, element){
            let title = $(this).find('.entry-title');
            let date = $(this).find('.entry-date');
            let post = $(this).find('p');
            let results = [];
            app.post('/', function (req, res) {
                for (let i=1; i <= req.body.posts; i++){
                    results.push({
                        title: $(title).text(),
                        date: $(date).text(),
                        post: $(post).text(),
                    });
                }
                console.log(results);
                res.render('main', {
                    header: 'Новости по ii2',
                    content: 'Выберите сколько статей нужно отобразить',
                    title: results.title,
                    date: results.date,
                    post: results.post,
                });
            });
        });
    } else {
        console.log('Произошла ошибка!');
    }
});


app.get('/', function(req, res){
    res.render('main', {
        header: 'Новости по yii2',
        content: 'Выберите сколько статей нужно отобразить?'
    });
});

app.listen(8888, function () {
    console.log('Сервер запущен');
});