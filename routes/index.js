const express = require('express');
const router = express.Router();
const travelModel = require('../models/travelModel');
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
