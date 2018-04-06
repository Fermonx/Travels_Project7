let conn = require('../connection/mysqlconnection');
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
    conn.query('INSERT INTO users SET ?',[user], (error, result)=>{
        if(error) return cb(error);
        console.log(result);
        return cb(null, result);
    })
};

Users.fetchUser = ([user], cb)=>{
    if(!conn) return cb("No se ha podido crear la conexión");
    const SQL = "SELECT * FROM users WHERE username=?";
    conn.query(SQL, user.user, (error, rows)=>{
        if (error) return cb(error);
        if(user.pw == rows[0].password) return cb(null, rows);
        else return cb(null, false);
        console.log(SQL);
        console.log(user);
        //console.log(rows);
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