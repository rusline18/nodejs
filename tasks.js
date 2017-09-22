let express = require('express'),
    app = express(),
    templating = require('consolidate'),
    moment = require('moment'),
    Task = require('./models/tasks');


app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    Task.list().then(tasks => {
        res.render('main', {tasks})
    })
});


app.listen(8888, function(){
    console.log('Сервер запущен');
});