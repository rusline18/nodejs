let express = require('express')
    , app = express()
    , cheerio = require('cheerio')
    , templating = require('consolidate')
    , request = require('request')
    , tasks = require(.'models/tasks');

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/../views');


// app.get('/', function(req, res){
//     request('https://nix-tips.ru/tag/yii2', function(err, postRes, html){
//         if(!err && postRes.statusCode == 200){
//             let $ = cheerio.load(html);
//             $('.type-post').each(function(i, elem){
//                 let title = $(this).find('.entry-title');
//                 let content = $(this).find('p');                
//                 res.render('main', {
//                     header: 'Статьи yii2',
//                     title: $(title).text(),
//                     content: $(content).text(),
//                 })
//             });
//         } else {
//             return res.satatus(400).json({error: err.message});
//         }
//     })
// })

request('https://nix-tips.ru/tag/yii2', function(err, response, html){
        if(!err && response.statusCode == 200){
            let $ = cheerio.load(html);
            $('.type-post').each(function(i, elem){
                let arrTitle = [];
                let arrContent = [];
                arrTitle[] .= $(title).text();
                arrContent[] .= $(content).text()
                console.log(arrTitle);
                console.log(arrContent);
            });
        } else {
            return res.satatus(400).json({error: err.message});
        }
    })

// app.listen(8888, function(){
//     console.log('Сервер запущен');
// })