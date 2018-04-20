const  express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.get('/register', function(req,res,next) {
   userController.register(req,res,next);
});

router.post('/register', function(req,res,next) {
    userController.insert(req,res,next);
});

router.get('/login', function(req,res,next) {
    userController.login(req,res,next);
});

router.post('/login',function(req,res,next) {
    userController.retrieve(req,res,next);
});


module.exports = router;


