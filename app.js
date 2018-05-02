let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let morgan = require('morgan');
let session = require('express-session');
let bodyParser = require("body-parser");
let flash = require ('connect-flash');
let pagination = require('express-paginate');
let passport = require('passport');
let i18n = require('i18n');
let sqlStore = require('connect-mssql')(session);
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let admins = require ('./routes/admins');
let mailer = require('./routes/mailer');
let paginate = require('./routes/pagination');
//let i18nruta = require('./routes/i18n');

let winston = require('./config/winston');
let multer = require('./config/multer');


let app = express();

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

i18n.configure({
   locales:['es','en'],
   cookie:'secret-lang',
   directory: __dirname+'/locales',
   defaultLocale: 'es'
});

app.use(i18n.init);

app.use(session({
    secret: 'SecretKey',
    name: 'SessionCookie',
    resave: true,
    //store: new sqlStore({}),
    saveUninitialized: true //Sin esto hay navegadores que no generan la cookie, utilizar a pesar de estar deprecated.
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

    //Routes

app.use('/views', usersRouter);
app.use('/admins',admins);
app.use('/mailer', mailer);
app.use('/', indexRouter);
//app.use('/i18n',i18nroute);


app.get('/locale/:lang',(req,res,next)=>{
   res.cookie(
       'secret-lang',
       req.params.lang
   );
     res.redirect('/');
});

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
