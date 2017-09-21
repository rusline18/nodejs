let express = require('express')
    , app = express()
    , templating = require('consolidate')
    , Task = require('./models/tasks');


app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


//Это правильно вывожу и в шаблоне скорее всего правильно буду выводить?
app.get('/', function (req, res) {
    Task.list(task => {
        res.render('main', task)
    });
});


app.listen(8888, function(){
    console.log('Сервер запущен');
});