let express = require('express');
let router = express.Router();
let travelController = require('../controllers/travelController');
let userController = require('../controllers/userController');
let Multer = require('multer');
let upload = require('../config/multer');

// PANEL ADMINISTRACION DE VIAJES

router.get('/admintable',function(req,res,next) {
   travelController.getTravelsAdmin(req,res,next);
});

router.post('/admintable', upload.single('file'), function(req,res,next) {
   travelController.travelCreate(req,res,next);
});

router.get('/admintable/travelDelete/:id', function(req,res,next) {
    travelController.travelDelete(req,res,next);
});

router.get('/admintable/travelHide/:id', function(req,res,next) {
   travelController.travelHide(req,res,next);
});

//PANEL DE ADMINISTRACION USUARIOS

router.get('/userstable', function(req,res,next) {
    userController.showUsersTable(req,res,next);
});

router.get('/userstable/userHide/:id', function(req,res,next) {
   userController.userHide(req,res,next);
});

router.get('/userstable/userDelete/:id', function(req,res,next) {
   userController. userDelete(req,res,next);
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