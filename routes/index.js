var express = require('express');
var router = express.Router();
var travelModel = require('../models/travelModel');
var userModel = require('../models/userModel');
var bcrypt = require('bcrypt-nodejs');

const Email = require('../config/emailConf');
const Hbs = require('nodemailer-express-handlebars');
const Path = require('path'); //Módulo para registrar el path
const Multer = require('multer');
const upload = require('../config/multer');



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

// PANEL ADMINISTRACION DE VIAJES

router.get('/admintable', function (req, res, next)
{
    permisos = req.session.isAdmin;
    sesion = req.session.username;
    if(permisos == 1)
    {
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
    }
    else res.redirect('/');
});


router.get('/admintable/hideTravel/:id', (req, res, next)=>{
    travelModel.hideTravel(req.params.id, (error, cb)=>{
        if(error) res.status(500).json(error);
        else res.redirect('/admintable');
    })
});

router.post('/admintable/create',upload.single('file'), function (req,res,next) {
    console.log(req.file);
    let travel={
        travel:req.body.travel,
        description:req.body.description,
        price:req.body.price,
        tipo:req.body.tipo,
        image:req.file.path
    };
    travel.image = travel.image.replace("\\", "/");
    travelModel.travelCreate(travel,(error,trav)=>{
        if(error) res.status(500).json(error);
        else{
            res.redirect('/admintable');
        }
    })

});

router.get('/admintable/travelDelete/:id', (req,res,next)=> {
    travelModel.travelDelete(req.params.id,(error,cb)=>{
        if(error) res.status(500).json(error);
        else{
            res.redirect('/admintable');
        }
    })
});

//PANEL ADMINISTRACION DE USUARIOS

router.get('/userstable', function (req, res, next)
{
   permisos = req.session.isAdmin;
   sesion = req.session.username;
   if(permisos == 1)
   {
       userModel.fetchUsersT((error,retrieveUser)=>{
           if(retrieveUser){
               res.render('userstable.hbs', {
                   title:'ADMIN VIEW',
                   layout: 'layout',
                   isAdmin: permisos,
                   isUser: sesion,
                   retrieveUser: retrieveUser
               });
           }
       });
   }
});

router.get('/userstable/deactivateUser/:id', (req, res, next)=>{
    userModel.deactivateUser(req.params.id, (error, cb)=>{
        if(error) res.status(500).json(error);
        else res.redirect('/userstable');
    })
});



router.get('/userstable/userDelete/:id', (req,res,next)=> {
    userModel.userDelete(req.params.id,(error,cb)=>{
        if(error) res.status(500).json(error);
        else{
            res.redirect('/userstable');
        }
    })
});


//REGISTRO DE USUARIO

router.post('/insert',(req,res,next)=>{

    var hash = bcrypt.hashSync(req.body.password);

    var pswEnc = (function(){
        var hash = 0;
        for (i = 0; i < req.body.passw.length; i++) {
            char = req.body.passw.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    })();
    var hashGen = (function () {
       var hash = 0;
       for (i = 0; i<req.body.username.length; i++){
           char = req.body.username.charCodeAt(i);
           hash = ((hash<<5)-hash)+char;
           hash = hash & hash;
       }
       return hash;
    })();

    const user ={
        "username": req.body.username,
        "email": req.body.email,
        "password": pswEnc,
        "hash": hash
    };

    userModel.insert(user,(error, insertUSR)=>{
        if(error) res.status(500).json('Error al crear usuario'+ error);
        switch(insertUSR)
        {
            case 1:
                req.flash('errorUsuario','El usuario ya existe, inténtelo de nuevo');
                res.redirect('/registro');
                break;
            case 2:
                req.flash('errorEmail','El email ya existe, inténtelo de nuevo');
                res.redirect('registro');
                break;
            case 3:
                let hash2=user.hash;
                let hashEncode=encodeURIComponent(hash2);

                Email.transporter.use('compile', Hbs ({
                    viewEngine: 'hbs',
                    extName:'.hbs',
                    viewPath: Path.join(__dirname,'../views/emailTemplates')
                }));

                let message = {
                    to: user.email,
                    subject : 'Geekshubs Travel - Activar Cuenta',
                    template:'email'
                };
                Email.transporter.sendMail(message,(error,info) =>{
                    if(error){
                        res.status(500).send(error);
                        return
                    }
                    Email.transporter.close();
                    res.status(200).send('Respuesta "%s"' + info.response);
                });
                res.render('login.hbs', {
                    title: 'G H T Login',
                    layout: 'layout',
                    registroCorrecto: true
                });
                break;
        }
    })
});


//LOGIN DE USUARIO

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

// ACTIVACION USUARIO

router.get('/activate/:hash', (req,res,next)=>{

});

router.get('/recoverpw', (req,res,next)=>{

});

router.get('/userstable/deactivateUser/:id', (req, res, next)=>{
    userModel.deactivateUser(req.params.id, (error, cb)=>{
        if(error) res.status(500).json(error);
        else res.redirect('/userstable');
    })
});

/*
router.get('/*', function(req, res, next) {
    permisos = req.session.isAdmin;
    sesion = req.session.username;
    res.render('404.hbs', {
        isAdmin: permisos,
        isUser: sesion,
        title: 'Oops!',
        layout: 'layout'
    });
});*/





module.exports = router;