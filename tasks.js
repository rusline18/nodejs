let express = require('express'),
    app = express(),
    templating = require('consolidate'),
    moment = require('moment'),
    bodyParser = require('body-parser'),
    handlebars = require('handlebars'),
    Task = require('./models/tasks');


app.engine('hbs', templating.handlebars);
app.use(express.static(__dirname));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}))

handlebars.registerHelper('selected', (option, value) => {
    if (option === value) {
        return 'selected';
    } else {
        return '';
    }
})

app.get('/', (req, res) => {
    Task.list().then(tasks => {
        tasks = tasks.map(function (task) {
            moment.locale('ru');
            moment.updateLocale('ru', {
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
            });
            task.srok = moment(task.srok).format('D MMMM YYYY HH:mm');
            if (task.prioritet == 1) {
                task.prioritet = 'Низкий';
            } else if (task.prioritet == 2) {
                task.prioritet = 'Средний';
            } else {
                task.prioritet = 'Высокий';
            }

            return task;
        });
        res.render('main', {title: 'Задачник', tasks: tasks})
    })
});

app.get('/update/:id', (req, res) => {
    Task.getId(req.params.id).then(task => {
        task = task.map(function(task){
            task.srok = moment(task.srok).format('YYYY-MM-DDTHH:mm:ss.SSS');

            return task;
        })
            res.render('update', {title: 'Редактирование задачи: '+task[0].id, task: task})
        }
    )
});

app.get('/delete/:id', (req, res) => {
    Task.delete(req.params.id).then(task => {
        res.redirect('/');
    })
})

app.post('/', (req, res) => {
    Task.create(req.body).then(tasks => {
        res.redirect('/')
    })
})

app.post('/update/:id', (req, res) => {
    Task.update(req.params.id, req.body).then(tasks => {
        res.redirect('/')
    })
})


app.listen(8888, function(){
    console.log('Сервер запущен');
});