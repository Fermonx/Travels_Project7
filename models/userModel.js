let conn = require('../connection/mysqlconnection');
let sequelize = require('../config/sequelize');
let Sequelize = require('sequelize');
let Users = {};


//Pedir datos a la DB

Users.fetchAll = (cb)=>{
    if(!conn) return cb("No se ha podido crear la conexión");
    const SQL = 'SELECT username, password FROM users WHERE;';
    conn.query(SQL, (error, rows)=>{
        if (error) return cb(error);
        else return cb(null, rows);
    })
};



//Inyectar datos a la DB

Users.insert = (user,cb)=>{
    if(!conn) return cb("No se ha podido crear la conexion");
    conn.query('SELECT * FROM users WHERE username=?',[user.username],(error,result)=>{
        if(error) return cb(error);
        if (result != ''){
            return cb(null,1);
        } else {
            conn.query('SELECT * FROM users WHERE email=?',[user.email],(error,result)=>{
                if(error) return cb(error);
                if (result != ''){
                    return cb(null,2);
                } else {
                    conn.query('INSERT INTO users SET ?',[user],(error,result)=>{
                        if(error) return cb(error);
                        return cb(null,3);
                    })}
            })}
    })};


Users.fetchUser = ([user], cb)=>{
    if(!conn) return cb("No se ha podido crear la conexión");
    const SQL = "SELECT * FROM users WHERE username=?";
    conn.query(SQL, user.user, (error, rows)=>{
        if (error) return cb(error);
        if(user.pw == rows[0].password) return cb(null, rows);
        else return cb(null, false);
    })
};

Users.fetchUsersT = (cb)=>{
    if(!conn) return cb("No se ha podido crear la conexión");
    const SQL = "SELECT * FROM users";
    conn.query(SQL, (error, rows)=>{
        if(error) return cb(error);
        else return cb(null, rows);
    })
};

Users.activate = (hash, cb)=>{
    if(!conn) return cb("No hay conexion");
    conn.query = "UPDATE users SET active=1 WHERE hash=?", hash, function(error,resultado){
        if(error) return cb(error);
        else return cb(null, resultado);
    };
};

Users.deactivateUser = (id,cb)=>{
    if(!conn) return cb("No se ha podido crear la conexión");
    conn.query("SELECT * FROM users WHERE id=?", id ,function(error, resultado) {
        if(error) return cb(error);
        else{
            let valorActivo = resultado[0].active;
            if(valorActivo == 1) valorActivo = 0;
            else valorActivo = 1;
            conn.query("UPDATE users SET active="+valorActivo+" WHERE id=?",id,function() {
                if (error) return cb(error);
                return cb(null, resultado);
            })

            }

        })
    };


Users.userDelete=(id,cb)=>{
    if(!conn) return cb("No se ha podido realizar conexión");
    conn.query("SELECT * FROM users WHERE id=?", id ,function (error,resultado) {
        if(error) return cb(error);
        else {
            conn.query("Delete from users where id=?", id ,function () {
                if(error) return cb(error);
                return cb(null,resultado);
            })
        }
    })
};


Users.activate = (hash, cb) => {
  if (!conn) return cb("No se ha podido realizar la conexión");
  conn.query("SELECT * FROM users WHERE hash=?")
};

Users.recover = (id, cb) => {
    if (!conn) return cb("No se ha podido realizar la conexión");
    conn.query("SELECT * FROM users WHERE email=?", id, function() {
        if(error) return cb(error);
        return cb(null, resultado);
    })
};

module.exports = Users;


//+user.user+"' and password ='"+user.pw+"'"

/*
function saveUser(hash, req, res){
    const USERS ={
        "username": req.body.username,
        "email": req.body.email,
        "password": hash
    };
    userModel.insert(USERS,(error, insertUSR)=>{
        if(insertUSR){
            res.render('login.hbs', {
                title: 'G H T Login',
                layout: 'layout',
                registroCorrecto: true
            });
        } else
            res.status(500).json('Error al crear usuario'+ error);
    })
}*/