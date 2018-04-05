var express = require('express');
var router = express.Router();


router.get('/', (req,res, next)=>{
    res.status(200).json(req.session.username || 'La sesión no se ha creado')
});

router.get('/create', (req, res, next)=>{
    req.session.username ="fmonc";
    req.session.isAdmin = 1;
    res.redirect('/admins');
});

router.get('/remove',(req,res,next)=>{
    req.session.username = null;
    res.redirect('/admins');
});

router.get('/destroy',(req,res,next)=>{
    req.session.destroy();
    res.redirect('/admins');
});

router.get('/private',(req,res,next)=>{
    if(req.session.isAdmin==1) res.status(200).send("Enhorabuena");
    else res.redirect('/admins');
})

module.exports = router;