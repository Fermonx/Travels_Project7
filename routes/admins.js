var express = require('express');
var router = express.Router();

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
});


module.exports = router;



/*
router.get('/create', (req, res, next)=>{
    req.session.username = 'Fernando';
    res.redirect('/admins');
});

router.get('/remove',(req,res,next)=>{
    req.session.username = null;
    res.redirect('/admins');
}); */