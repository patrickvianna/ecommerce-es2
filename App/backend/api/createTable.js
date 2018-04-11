const connStr = {
    user : 'PATRICK-PC\Patrick',
    password : '',
    database : 'mydb',
    server : 'localhost'
};
const sql = require("mssql");




sql.connect(connStr)
    .then(conn => console.log("conectou!"))
    .catch(err => console.log("erro! " + err));



//module.exports = {getTeste}