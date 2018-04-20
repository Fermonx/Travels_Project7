const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require("body-parser");
const flash = require ('connect-flash');
const pagination = require('express-paginate');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const admins = require ('./routes/admins');
const mailer = require('./routes/mailer');
const paginate = require('./routes/pagination');
const winston = require('./config/winston');
const multer = require('./config/multer');


const app = express();

//SIEMPRE VA INMEDIATAMENTE DESPUES DE app = express
//app.use(paginate.middleware(2,20));

//VARIABLE ENTORNO
const env = process.env.NODE_ENV || 'desarrollo';
const config = require('./config/config')[env];

switch(env)
{
    case 'desarrollo':
        console.log(config.SERVER);
        console.log(config.PORT);
        break;

    case 'produccion':
        console.log(config.SERVER);
        console.log(config.PORT);
        break;
}


//map the components folder as a route
app.use('/components', express.static(`${__dirname}/public/components`));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



const hbs = require('hbs');
hbs.registerPartials(`${__dirname}/views/partials`);

const hbsUtils = require('hbs-utils')(hbs);
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`);
//require('./helpers/hbs')(hbs);


app.use(morgan('dev'));
app.use(morgan('combined',{stream: winston.stream}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use( "/uploads", express.static( path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use(session({
    secret: 'SecretKey',
    name: 'SessionCookie',
    resave: true,
    saveUninitialized: true //Sin esto hay navegadores que no generan la cookie, utilizar a pesar de estar deprecated.
}));
app.use(flash());


    //Routes

app.use('/views', usersRouter);
app.use('/admins',admins);
app.use('/mailer', mailer);
app.use('/', indexRouter);

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

module.exports = app;
