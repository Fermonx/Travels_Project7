var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');
var travelModel = require('../models/travelModel');


/* GET home page. */
router.get('/', function(req, res, next) {
    permisos = req.session.isAdmin;
    sesion = req.session.username;
    travelModel.fetchTravel((error, retrieveTravel)=> {
        if (retrieveTravel) {
            res.render('index.hbs', {
                title: 'Geekshub Tours',
                layout: 'layout',
                isAdmin: permisos,
                isUser: sesion,
                retrieveTravel: retrieveTravel

            });
        }
    });

});

router.get('/login', function(req, res, next) {
    permisos = req.session.isAdmin;
    sesion = req.session.username;
  res.render('login.hbs', {
    title: 'G H T Login',
      layout: 'layout',
      isAdmin: permisos,
      isUser: sesion
  });
});

router.get('/registro', function(req, res, next)
{
    permisos = req.session.isAdmin;
    sesion = req.session.username;
    res.render('register.hbs', {
        title: 'G H T Registro',
        layout: 'layout',
        isAdmin: permisos,
        isUser: sesion
    });

});


router.get('/admintable', function (req, res, next)
{
    permisos = req.session.isAdmin;
    sesion = req.session.username;
    travelModel.fetchTravel((error, retrieveTravel)=> {
        if (retrieveTravel) {
            res.render('admin.hbs', {
                title: 'ADMIN VIEW',
                layout: 'layout',
                isAdmin: permisos,
                isUser: sesion,
                retrieveTravel: retrieveTravel
            });
        }
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
            req.session.username = USERS.user;
            console.log(retrieveUser);
            if(retrieveUser[0].admin) req.session.isAdmin = true;

            res.redirect('/')
        }else{
            res.render('login.hbs',{
                title: 'GHT',
                layout: 'layout',
                loginIncorrecto: true
            });
        }
    })
});



router.get('/admintable/hideTravel/:id', (req, res, next)=>{
    travelModel.hideTravel(req.params.id, (error, cb)=>{
        if(error) res.status(500).json(error);
        else res.redirect('/admintable');
    })
});


router.get('/*', function(req, res, next) {
    res.render('404.hbs', {
        title: 'Oops!',
        layout: 'layout'
    });
});



module.exports = router;



/*

res.render('index.hbs', {
                title: 'GHT',
                layout: 'layout',
                //loginCorrecto: true,
                isAdmin: true,
              //  req.session.username: USERS.user
            })
 */