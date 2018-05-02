let passport = require('passport');
let user = require('../models/sequelizeUserModel');
let localStrat = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(null,user.id);
});

passport.deserializeUser(function(id, done) {
   user.findById(id ,function(error, user) {
       done(error, user);
   })
});

passport.use('local.signin', new localStrat({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    user.findOne({where:{email: 'email'}},function(error, user) {
        if(error) done(error);
        if(user)
        {

        }
    })
}));