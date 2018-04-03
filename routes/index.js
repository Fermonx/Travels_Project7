var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
var bcrypt = require('bcrypt');


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

router.get('/registro', function(req, res, next)
{
    res.render('register.hbs', {
        title: 'G H T Registro',
        layout: 'layout'
    });

});



router.post('/insert',(req,res,next)=>{
    var pswEnc = (function(){
        var hash = 0;
        for (i = 0; i < req.body.passw.length; i++) {
            char = req.body.passw.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    })();
    const USERS ={
        "username": req.body.username,
        "email": req.body.email,
        "password": pswEnc
    };
    userModel.insert(USERS,(error, insertUSR)=>{
        if(insertUSR){
            res.render('login.hbs', {
                title: 'G H T Login',
                layout: 'layout',
                registroCorrecto: true
            });
        } else
        res.status(500).json('Error al crear usuario'+ error);
    })
});

router.post('/retrieve',(req,res,next)=>{
    var pswEnc = (function(){
        var hash = 0;
        for (i = 0; i < req.body.passwd.length; i++) {
            char = req.body.passwd.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    })();
    const USERS={
        "user": req.body.username,
        "pw": pswEnc
    };
    userModel.fetchUser([USERS],(error, retrieveUser)=>{
        if(retrieveUser){
            res.render('index.hbs', {
                title: 'GHT',
                layout: 'layout',
                loginCorrecto: true
            });
        }else{
            res.render('login.hbs',{
                title: 'GHT',
                layout: 'layout',
                loginIncorrecto: true
            });
        }
    })
});


router.get('/*', function(req, res, next) {
    res.render('404.hbs', {
        title: 'Oops!',
        layout: 'layout'
    });
});



module.exports = router;
