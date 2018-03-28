var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var hbs = require('hbs');
hbs.registerPartials(`${__dirname}/views/partials`);

var hbsUtils = require('hbs-utils')(hbs);
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use('/', indexRouter);
app.use('/views', usersRouter);

    //URL Encode
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  app.get('views/404.hbs')
  //next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

    //SQL connection

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'GHT_DB',

})


connection.connect(function(err) {
    if (err) throw (err)
    console.log('You are now connected...')
});


app.get('/signup',(req, res)=> res.sendFile(PATH.join(__dirname+`register.hbs`)))
let newUser = {username: req.body.inputuser, email: req.body.inputemail, password1: req.body.password}


/*
connection.query('CREATE TABLE users(id int primary key not null, username varchar(45) not null, email varchar(45) not null, password varchar(80))', function(err, result) {
    if (err) throw err
    connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', function(err, result) {
        if (err) throw err
        connection.query('SELECT * FROM people', function(err, results) {
            if (err) throw err
            console.log(results[0].id)
            console.log(results[0].name)
            console.log(results[0].age)
            console.log(results[0].address)
        })
    })
})
})*/

module.exports = app;
