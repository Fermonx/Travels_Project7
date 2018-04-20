let bcrypt = require('bcrypt-nodejs');
let userModels = require('../models/sequelizeUserModel');
let Hbs = require('nodemailer-express-handlebars');
let Path = require('path');
let email = require('../config/emailConf');

let mailController = {};

// ACTIVACION USUARIO

mailController.activate = function(req,res,next){
    let hash = decodeURIComponent(req.params.hash);
    userModels.findOne({where:{hash: hash}}).then(activar=>{

        activar.updateAttributes({active: 1}).then(activarSuccess=> {
            if(activarSuccess) res.redirect('/views/login');
        })
    })
};

module.exports = mailController;