var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.hbs', {
    title: 'Geekshub Tours',
    layout: 'layout'
  });
});

router.get('/login', function(req, res, next) {
  res.render('login.hbs', {
    title: 'G H T Login',
      layout: 'layout'
  });
});

router.get('/registro', function(req, res, next) {
    res.render('register.hbs', {
        title: 'G H T Registro',
        layout: 'layout'
    });
});

router.get('/*', function(req, res, next) {
    res.render('404.hbs', {
        title: 'Oops!',
        layout: 'layout'
    });
});

module.exports = router;
