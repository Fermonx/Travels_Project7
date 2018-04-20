const  express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');

router.get('/activate/:hash', (req,res,next)=>{
    mailController.activate(req,res,next);
});

module.exports = router;