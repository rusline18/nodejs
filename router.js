let express = require('express'),
    app = express(),
    templating = require('consolidate'),
    moment = require('moment'),
    bodyParser = require('body-parser'),
    handlebars = require('handlebars'),
    session = require('cookie-session'),
    passport = require('passport'),
    LocaleStrategy = require('passport-local').Strategy,
    RememberMeStrategy = require('passport-remember-me').Strategy,
    Task = require('./models/tasks');

global.Promise = require('bluebird');


app.engine('hbs', templating.handlebars);
app.use(express.static(__dirname));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    name: 'session',
    keys: ['key'],
    maxAge: 24*60*60*1000
}));
app.use(passport.initialize());
app.use(passport.session());

let mustBeAuthenticated = (req, res, next) => {
    req.isAuthenticated() ? next() : res.redirect('/login');
}

passport.use(new LocaleStrategy((username, password, done) => {
    if (username == 'admin' && password == 'admin') {
        return done(null, {username: 'admin'})
    }
    return done(null, false, { 
            message: 'Неверный логин или пароль' 
        })
}));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((id, done) => {
    done(null, {username: id});
});

handlebars.registerHelper('selected', (option, value) => {
    if (option === value) {
        return 'selected';
    } else {
        return '';
    }
})

app.all('/task', mustBeAuthenticated);
app.all('/task/*', mustBeAuthenticated);
app.all('/update/*', mustBeAuthenticated);
app.all('/delete/*', mustBeAuthenticated);


app.get('/task', (req, res) => {
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
    });
});

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/task',
    failureRedirect: '/login',
    failureFlash: true,
}), (req, res, next)  => {
    if (!req.body.remember_me) { return next(); }

    var token = utils.generateToken(64);
    Token.save(token, { userId: req.user.id }, function(err) {
      if (err) { return done(err); }
      res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 }); // Почему-то в куках браузера я его не вижу, только сессии.
      return next();
    });
  },
  (req, res) => {
    res.redirect('/');
  });

app.post('/task', (req, res) => {
    Task.create(req.body).then(tasks => {
        res.redirect('/task')
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