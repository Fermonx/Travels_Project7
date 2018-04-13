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
        subject : 'Email de prueba',
        template:'email',
        attachments:[
            {
                filename:'16083767_ml.jpg',
                path:__dirname +'/../public/images/16083767_ml.jpg',
                cid: 'imagen'
            },
            {
                filename:'super.jpeg',
                path:__dirname +'/../public/images/16083767_ml.jpg'
            }
        ]
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
