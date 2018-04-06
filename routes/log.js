var express = require('express');
var router = express.Router();
var winston = require('../config/winston');


router.get('/',(req,res,next)=>{
    winston.info(("Error en la generacion"));
    res.send(req.flash('info'));
    res.send(req.flash('error'));
});

router.get('/create',(req,res,next)=>{
    req.flash('info','Sesion flash creada');
    req.flash('error','Error');
    res.redirect('/log');
});



module.exports = router;