let conn = require('../connection/mysqlconnection');
let Users = {};


//Pedir datos a la DB

Users.fetchAll = (cb)=>{
    if(!conn) return cb("No se ha podido crear la conexión");
    const SQL = 'SELECT * FROM users;';
    conn.query(SQL, (error, rows)=>{
        if (error) return cb(error);
        else return cb(null, rows);
    })
}


//Inyectar datos a la DB

Users.insert = (user,cb)=>{
    if(!conn) return cb("No se ha podido crear la conexion");
    conn.query('INSERT INTO users SET ?',[user], (error, result)=>{
        if(error) return cb(error);
        console.log(result);
        return cb(null, result);
    })
}

module.exports = Users;
