let express = require('express'),
    app = express(),
    templating = require('consolidate'),
    moment = require('moment'),
    bodyParser = require('body-parser'),
    handlebars = require('handlebars'),
    session = require('cookie-session'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    LocaleStrategy = require('passport-local').Strategy,
    VKontakteStrategy = require('passport-vkontakte').Strategy,
    Task = require('./models/tasks');

global.Promise = require('bluebird');

moment.locale('ru');
moment.updateLocale('ru', {
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
});

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
    req.isAuthenticated() 
        ? next() 
        : res.redirect('/login');
}

passport.use(new LocaleStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
}, (req, username, password, done) => {
    if (!username || !password){
        return done(null, false)
    };
    pool.getConnection((err, connection) => {
        if (err) throw done(err);
        connection.query('SELECT * FROM user WHERE username = ?',
            [username],
            (err, rows) => {
                if (err) return done(err);
                if(!rows.length){ 
                    return done(null, false); 
                }
                if (!(password == rows[0].password)){
                    return done(null, false);
                }
                return done(null, rows[0].username);
            });
    });
}));

passport.use(new VKontakteStrategy({
    clientID: 6197191,
    clientSecret: 'a3ulPX3sHmVsiQyrS189',
    callbackURL: 'http://localhost:8888/auth/vk/callback'
},
    function myVerifyCallback(accessToken, refreshToken, params, profile, done) {
        return done(null, {
            username: profile.displayName,
            profileUrl: profile.profileUrl
        });
    });
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    pool.getConnection((err, connection) => {
        connection.query("SELECT * FROM user WHERE id = ?",
         [id], 
         (err, rows) => {
            done(err, rows[0]);
        });
    });
});

handlebars.registerHelper('selected', (option, value) => {
    if (option === value) {
        return 'selected';
    } else {
        return '';
    }
});

app.all('/task', mustBeAuthenticated);
app.all('/task/*', mustBeAuthenticated);
app.all('/update/*', mustBeAuthenticated);
app.all('/delete/*', mustBeAuthenticated);


app.get('/task', (req, res) => {
    Task.list().then(tasks => {
        tasks = tasks.map((task) => {
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
        res.render('main', {title: 'Задачник', tasks: tasks});
    })
});

app.get('/update/:id', (req, res) => {
    Task.getId(req.params.id).then(task => {
        task = task.map((task) => {
            task.srok = moment(task.srok).format('YYYY-MM-DDTHH:mm:ss.SSS');
            return task;
        });
        res.render('update', {
            title: 'Редактирование задачи: '+task[0].id,
            task: task
        });
    });
});

app.get('/delete/:id', (req, res) => {
    Task.delete(req.params.id).then(task => {
        res.redirect('/');
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/task',
    failureRedirect: '/login',
    failureFlash: true,
}), (req, res, next)  => {
    if (req.body.remember) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    } else {
        req.session.cookie.expires = false;
    }
  });

app.post('/task', (req, res) => {
    Task.create(req.body).then(tasks => {
        res.redirect('/task')
    });
});

app.post('/update/:id', (req, res) => {
    Task.update(req.params.id, req.body).then(tasks => {
        res.redirect('/')
    });
});

app.get('/auth/vk', passport.authenticate('vkontakte'));
app.get('/auth/vk/callback',
    passport.authenticate('vkontakte', {
        successRedirect: '/task',
        failureRedirect: '/login'
    }
));

app.listen(8888, function(){
    console.log('Сервер запущен');
});
