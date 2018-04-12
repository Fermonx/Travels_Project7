var express = require('express');
var router = express.Router();
const Email = require('../config/emailConf');
const Hbs = require('nodemailer-express-handlebars');
const Path = require('path'); //Módulo para registrar el path




router.get('/send',(req,res,next) =>{
    let message= {
        to:'hiperiumtv@gmail.com',
        subject : 'Email de prueba',
        html: '<p>Hola es una prueba</p>'
    }
    Email.transporter.sendMail(message,(error,info) =>{
        if(error){
            res.status(500).send(error);
            return
        }
        Email.transporter.close();
        res.status(200).send('Respuesta "%s"' + info.response);
    })
});

router.get('/sendAttachment',(req,res,next)=>{
    let message= {
        to:'xavi@geekshubs.com',
        subject : 'Email de prueba',
        html: '<p>Hola es una prueba</p><p><img src="cid:imagen"/></p>',
        attachments:[
            {
                filename:'super.jpeg',
                path:__dirname +'/../public/images/super.jpeg',
                cid: 'imagen'
            },
            {
                filename:'super.jpeg',
                path:__dirname +'/../public/images/super.jpeg'
            }
        ]
    }
    Email.transporter.sendMail(message,(error,info) =>{
        if(error){
            res.status(500).send(error, message);
            return
        }
        Email.transporter.close();
        res.status(200).send('Respuesta "%s"' + info.response);
    })
})

router.get('/sendHandlebars',(req,res,next)=>{
    Email.transporter.use('compile', Hbs ({
        viewEngine: 'hbs',
        extName:'.hbs',
        viewPath: Path.join(__dirname,'../views/email-templates')
    }));
    let message= {
        to:'xavi@geekshubs.com',
        subject : 'Email de prueba',
        template:'email',
        context: {
            texto:
                'Xavi'
        },
        attachments:[
            {
                filename:'super.jpeg',
                path:__dirname +'/../public/images/super.jpeg',
                cid: 'imagen'
            },
            {
                filename:'super.jpeg',
                path:__dirname +'/../public/images/super.jpeg'
            }
        ]
    }
    Email.transporter.sendMail(message,(error,info) =>{
        if(error){
            res.status(500).send(error, message);
            return
        }
        Email.transporter.close();
        res.status(200).send('Respuesta "%s"' + info.response);
    })
})


module.exports = router;
