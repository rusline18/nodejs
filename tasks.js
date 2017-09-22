let express = require('express'),
    app = express(),
    templating = require('consolidate'),
    moment = require('moment'),
    Task = require('./models/tasks');


app.engine('hbs', templating.handlebars);
app.use(express.static(__dirname));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    Task.list().then(tasks => {
        tasks = tasks.map(function (task) {
            moment.locale('ru');
            moment.updateLocale('ru', {
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
            });
            task.srok = moment(task.srok).format('D MMMM YYYY HH:mm');

            return task;
        });
        res.render('main', {tasks})
    })
});


app.listen(8888, function(){
    console.log('Сервер запущен');
});