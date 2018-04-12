/*

const Sequelize = require('sequelize');

const sequelize = new Sequelize('GHT_DB','root','mysql',{
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(()=>{
        console.log('Conectado correctamente');
    })
    .catch(err => {
        console.error('No se ha podido conectar con la Base de Datos', err);
    });

const Usuario = sequelize.define('users',{
    firstName : {
        type: Sequelize.STRING
    },
    lastName : {
        type: Sequelize.STRING
    }
});


module.exports = Sequelize;
*/