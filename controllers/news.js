let express = require('express')
    , app = express()
    , cheerio = require('cheerio')
    , templating = require('consolidate')
    , request = require('request')
<<<<<<< HEAD
    , tasks = require('./models/tasks');
=======
    , tasks = require(.'models/tasks');
>>>>>>> 06c0e358c6542b743492ff9ffbb8e31e92b8010c

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/../views');


// app.get('/', function(req, res){
//     request('https://nix-tips.ru/tag/yii2', function(err, postRes, html){
//         if(!err && postRes.statusCode == 200){
//             let $ = cheerio.load(html);
//             $('.type-post').each(function(i, elem){
//                 let title = $(this).find('.entry-title');
<<<<<<< HEAD
//                 let content = $(this).find('p');
=======
//                 let content = $(this).find('p');                
>>>>>>> 06c0e358c6542b743492ff9ffbb8e31e92b8010c
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 06c0e358c6542b743492ff9ffbb8e31e92b8010c

// app.listen(8888, function(){
//     console.log('Сервер запущен');
// })