const SEQUELIZE = require('sequelize');


let sequelize = new SEQUELIZE('GHT_DB','root','mysql',{
    host:'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;