let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt-nodejs');
let userModel =require('../models/userModel');
let usersModel = require('../models/sequelizeUserModel');
let Email= require('../config/emailConf');
let Hbs = require('nodemailer-express-handlebars');
let Path = require('path');
let passport = require('passport');
let localStrat = require('passport-local').Strategy;
let userController = {};

passport.serializeUser((user, done)=>{
   done(null, user.id);
});


//REGISTRO DE USUARIO

userController.register = function(req, res, next)
{
    if(req.session.username)
    {
        next();
    }else{
        res.render('register', {
            title: 'G H T Registro',
            layout: 'layout',
            isAdmin: req.session.isAdmin,
            isUser: req.session.username
        });
    }
};

userController.insert = function(req,res,next)
{
    let hash = bcrypt.hashSync(req.body.username);
    let pswEnc = (function(){
        let hashpw = 0;
        for (i = 0; i < req.body.password.length; i++) {
            char = req.body.password.charCodeAt(i);
            hashpw = ((hashpw<<5)-hashpw)+char;
            hashpw = hashpw & hashpw; // Convert to 32bit integer
        }
        return hashpw;
    })();
    const user ={
        "username": req.body.username,
        "email": req.body.email,
        "password": pswEnc,
        "active":0,
        "admin":0,
        "hash": hash
    };
    usersModel.findOrCreate({where: {email: user.email},defaults:{password:user.password, admin: 0, active: 0, hash: user.hash}})
        .spread((user, created)=>{
            if(created)
            {
                let hashEncode = encodeURIComponent(hash);
                Email.transporter.use('compile', Hbs ({
                    viewEngine: 'hbs',
                    extName:'.hbs',
                    viewPath: Path.join(__dirname,'../views/emailTemplates')
                }));
                let message = {
                    to: user.email,
                    subject : 'Geekshubs Travel - Activar Cuenta',
                    template:'email',
                    context:{
                        ruta: 'http://localhost:3000/mailer/activate/'+hashEncode
                    }
                };
                Email.transporter.sendMail(message,(error,info) =>{
                    if(error){
                        res.status(500).send(error);
                        return
                    }
                    Email.transporter.close();
                });
                res.render('login', {
                    title: 'G H T Login',
                    layout: 'layout',
                    registroCorrecto: true
                });

            }
            else if(user){
                res.render('register', {
                    title: 'G H T Registro',
                    layout: 'layout',
                    emailTaken: true
                })
            }
    })

};

//LOGIN DE USUARIO

userController.login = function(req, res, next)
{
    permisos = req.session.isAdmin;
    sesion = req.session.username;
    res.render('login', {
        title: 'G H T Login',
        layout: 'layout',
        isAdmin: permisos,
        isUser: sesion
    });
};

userController.retrieve = function(req,res,next){
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
        "email": req.body.email,
        "pw": pswEnc
    };

    usersModel.findOne({where:{email: USERS.email},defaults:{password: USERS.pw}}).then(log=>{
        if (log)
        {
            req.session.username = USERS.user;
            res.redirect('/');
        }
        else
        {
            res.render('login',{
                title:'GH Travels',
                layout: 'layout',
                loginIncorrecto: true
            });
        }
    });
};

//PANEL ADMINISTRACION DE USUARIOS

router.get('/userstable', function (req, res, next)
{
    if(permisos == 1)
    {
        userModel.fetchUsersT((error,retrieveUser)=>{
            if(retrieveUser){
                res.render('userstable.hbs', {
                    title:'ADMIN VIEW',
                    layout: 'layout',
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


router.get('/recoverpw', (req,res,next)=>{

});

router.get('/userstable/deactivateUser/:id', (req, res, next)=>{
    userModel.deactivateUser(req.params.id, (error, cb)=>{
        if(error) res.status(500).json(error);
        else res.redirect('/userstable');
    })
});


module.exports = userController;


 //SESIONES
/*
router.get('/', (req,res, next)=>{
    res.status(200).json(req.session || 'La sesión no se ha creado')
});


router.get('/destroy',(req,res,next)=>{
    req.session.destroy();
    res.redirect('/');
});

router.get('/private',(req,res,next)=>{
    if(req.session.username === 'Fernando'){
        res.render('index.hbs', {
            title: 'Geekshub Tours',
            layout: 'layout',
            adminSi: true
        });
    }

    else {
        res.render('login.hbs', {
            title: 'Geekshub Tours',
            layout: 'layout'
        });
    }
});*/