let conn = require('../connection/mysqlconnection');
let travels = {};

travels.fetchTravel = (cb)=>{
    if(!conn) return cb("No se ha podido crear la conexión");
    const SQL = "SELECT * FROM travels";
    conn.query(SQL, (error, rows)=>{
        if (error) return cb(error);
        else return cb(null, rows);

    })
};



travels.hideTravel = (id, cb)=>{
    if(!conn) return cb("No se ha podido crear la conexión");
    conn.query("SELECT * FROM travels WHERE id=?", id ,function(error,resultado){
        if(error) return cb(error)
        else{
            let valorActivo = resultado[0].active;
            if(valorActivo == 1) valorActivo = 0;
            else valorActivo = 1;
            console.log(valorActivo);
            conn.query("update travels set active="+valorActivo+" WHERE id=?",id,function () {
                console.log(valorActivo);
                if(error) return cb(error);
                return cb(null, resultado);
            })

            }
        })
    };




module.exports = travels;