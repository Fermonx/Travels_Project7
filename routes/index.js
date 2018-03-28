var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');



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
    const USERS ={
        "username": req.body.username,
        "email": req.body.email,
        "password": req.body.passw
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
})

/*router.get('/retrieve',(req,res,next)=>{
    const USERGET ={

    }
})
*/

router.get('/*', function(req, res, next) {
    res.render('404.hbs', {
        title: 'Oops!',
        layout: 'layout'
    });
});



module.exports = router;
