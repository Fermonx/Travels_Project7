let connector = require('../config/connector');
let sequelize =  require('sequelize');

let Users = {};

const User = connector.define('users',{
   username:{
       type: sequelize.STRING(45)
   },
    email:{
       type: sequelize.STRING(45)
    },
    password:{
       type: sequelize.STRING(80)
    },
    admin:{
        type: sequelize.INTEGER(11)
    },
    active:{
        type: sequelize.INTEGER(11)
    },
    hash:{
       type: sequelize.STRING(100)
    }
});

Users.login = (usuario,cb)=>{
    User.findOne({where:{email:usuario.email}}).then((usuario)=>{
        return cb(null,usuario);
    }).error((error)=>{
        return cb(error);
    })
};

module.exports = Users;