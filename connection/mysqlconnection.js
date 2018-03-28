const MYSQL = require('mysql');
const CONN = MYSQL.createConnection({
    host:'localhost',
    user:'root',
    password:'mysql',
    database:'GHT_DB'
})

module.exports = CONN;