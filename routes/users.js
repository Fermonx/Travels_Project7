const  express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const travelController = require('../controllers/travelController');


router.get('/register', function(req,res,next) {
   userController.register(req,res,next);
});

router.post('/register', function(req,res,next) {
    userController.insert(req,res,next);
});

router.get('/login', function(req,res,next) {
    userController.login(req,res,next);
});

router.post('/login', passport.authenticate('local',{
    failureRedirect: '/404',
    //variableModal
}), function(req,res,next) {
    userController.retrieve(req,res,next);
});

router.get('/logout', function(req,res,next) {
   userController.logOut(req,res,next);
});

router.get('/checkout',function(req,res,next) {
    travelController.checkout(req,res,next);
});

router.get('/checkout/checkoutAdd/:id',function(req,res,next) {
    console.log('SI ENTRA');
   travelController.checkoutAdd(req,res,next);
});


module.exports = router;


