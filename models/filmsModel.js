let conn = require('../connection/mysqlconnection');
let Films = {};


//Pedir datos a la DB

Films.fetchAll = (cb)=>{
    if(!conn) return cb("No se ha podido crear la conexion");
    const SQL = 'SELECT * FROM film WHERE title LIKE "%airport%";';
    conn.query(SQL, (error, rows)=>{
        if (error) return cb(error);
        else return cb(null, rows);
    })
}


//Inyectar datos a la DB

Films.insert = (film,cb)=>{
    if(!conn) return cb("No se ha podido crear la conexion");
    conn.query('INSERT INTO film SET ?',[film], (error, result)=>{
        if(error) return cb(error);
        return cb(null, result.film_id);
    })
}

module.exports = Films;


/*
Users.insert = (user, cb)=>{
if(!conn) return cb('none');
conn.query('INSERT INTO users SET ?',[users],(error, result)=>{
    if(error)return cb(error);
    return cb(null, result.use.ids);
  })
}
 */