let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt-nodejs');
let usersModel = require('../models/sequelizeUserModel');
let Email= require('../config/emailConf');
let Hbs = require('nodemailer-express-handlebars');
let Path = require('path');
let passport = require('passport');
let localStrat = require('passport-local').Strategy;
let userController = {};



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
    usersModel.findOrCreate({where: {email: user.email},defaults:{username: user.username, password:user.password, admin: 0, active: 0, hash: user.hash}})
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
        mensaje : req.flash('mensajeError'),// Aqui recibimos el mensaje flash y lo guardamos en una variable
        isAdmin: req.session.isAdmin, // recogemos la sesion creada
        isUser: req.session.username // recogemos la sesion creada
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
    usersModel.login(USERS,(error,usuario)=>{
        if (error) next();
        else {
            if (!usuario){
                req.flash('mensajeError','El email no existe! Intentelo de nuevo'); // Hacemos el mensaje flash que le llegara al login
                res.redirect('/views/login'); // hacemos redirect al login , fijate en login arriba como recoges los mesajes flash
            } else {
                if (usuario.pw != USERS.pw){
                    req.flash('mensajeError','La contraseña es incorrecta! Intentelo de nuevo');
                    res.redirect('/views/login');
                }else {
                    req.session.username = usuario.username; // si todo es correcto , creamos la sesion
                    req.session.isAdmin = usuario.admin; // si todo es correcto creamos la sesion
                    res.redirect('/');
                }

            }
        }
    });
};


userController.logOut = function(req,res,next)
{
    if(!req.session.email){
        next();
    }else{
        req.session.destroy();
        res.redirect('/');
    }
};

//PANEL ADMINISTRACION DE USUARIOS


userController.showUsersTable = function(req,res,next)
{
    usersModel.findAll().then(retrieveUser=>{
        if(retrieveUser)
        {
            res.render('userstable', {
                title: 'ADMIN VIEW',
                layout: 'layout',
                retrieveUser: retrieveUser
            });
        }
    })
};

userController.userHide = function(req,res,next)
{
    let reqId = req.params.id;
    usersModel.findOne({where:{id: reqId}}).then(activo=>{
        if(activo)
        {
            if(activo.active == 1) activo.updateAttributes({active: 0});
            else if(activo.active == 0) activo.updateAttributes({active: 1});
        }
        res.redirect('/admins/userstable');
    })
};


userController.userDelete = function(req,res,next)
{
    let reqId = req.params.id;
    usersModel.findOne({where:{id: reqId}}).then(usuario=>{
        if(usuario) usuario.destroy();
    }).then(()=>{
        res.redirect('/admins/userstable');
    })
};



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