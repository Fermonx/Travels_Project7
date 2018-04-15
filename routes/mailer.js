var express = require('express');
var router = express.Router();
const Email = require('../config/emailConf');
const Hbs = require('nodemailer-express-handlebars');
const Path = require('path'); //Módulo para registrar el path




router.get('/send',(req,res,next) =>{
    Email.transporter.use('compile', Hbs ({
        viewEngine: 'hbs',
        extName:'.hbs',
        viewPath: Path.join(__dirname,'../views/emailTemplates')
    }));

    let message= {
        to:'fernandomds@outlook.com',
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
    })
});

router.get('/sendreco',(req,res,next) =>{
    Email.transporter.use('compile', Hbs ({
        viewEngine: 'hbs',
        extName:'.hbs',
        viewPath: Path.join(__dirname,'../views/emailTemplates')
    }));

    let message= {
        to:'fernandomds@outlook.com',
        subject : 'Geekshubs Travel - Recuperar Contraseña',
        template:'email'
    };
    Email.transporter.sendMail(message,(error,info) =>{
        if(error){
            res.status(500).send(error);
            return
        }
        Email.transporter.close();
        res.status(200).send('Respuesta "%s"' + info.response);
    })
});


module.exports = router;
