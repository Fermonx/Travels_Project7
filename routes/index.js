const express = require('express');
const router = express.Router();
const travelModel = require('../models/travelModel');
const Multer = require('multer');
const upload = require('../config/multer');

var errorController = require('../controllers/errorController');
let travelController = require('../controllers/travelController');


/* GET home page. */
router.get('/', function(req, res, next) {
    travelController.getTravels(req,res,next);
});

router.get('/*', function(req,res,next){
    errorController.getErrorPage(req,res,next);
});



module.exports = router;


/*

permisos = req.session.isAdmin;
    sesion = req.session.username;
    travelModel.fetchTravel((error, retrieveTravel)=> {
        if (retrieveTravel) {
            res.render('index.hbs', {
                title: 'Geekshub Tours',
                layout: 'layout',
                isAdmin: permisos,
                isUser: sesion,
                retrieveTravel: retrieveTravel

            });
        }
    });

 */