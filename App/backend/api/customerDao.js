const restful = requere('node-restful')
const mysql = require(`mysql`);
const webConfig = require ('../config/server')

const getCustomer = (req, body, next) => {
    const customer = req.body.idCustomer || ''
    
    var conn = mysql.createConnection(webConfig.escdb);
    conn.connect();

    conn.query("SELECT * FROM TAB_CLIENTE WHERE ID = ?;", customer, 
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                re.json(results);
            conn.end()

        })
}

const getAllCustomers = (req, body, next) => {
    var conn = mysql.createConnection(webConfig.escdb);
    conn.connect();

    conn.query("SELECT * FROM TAB_CLIENTE;",
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                re.json(results);
            conn.end()

        })
}

const updateCustomer = (req, body, next) => {
    const nome = req.body.nome || ''
    const telefone = req.body.telefone || ''
    const endereco = req.body.endereco || ''
    const pessoa = req.body.pessoa || '' 

    var conn = mysql.createConnection(webConfig.escdb);
    conn.connect();

    conn.query(`UPDATE TAB_PESSOA SET NOME = ${nome}, TELEFONE = ${telefone} WHERE PESSOA = ?;`  , pessoa, 
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                re.json(results);
            conn.end()

        })
    
    conn.query(`UPDATE TAB_CLIENTE SET ENDERECO = ${endereco} WHERE PESSOA = ?;`  , pessoa, 
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                re.json(results);
            conn.end()

        })
    /*router.patch('/clientes/:id', (req, res) =>{
        const id = parseInt(req.params.id);
        const nome = req.body.nome.substring(0,150);
        const cpf = req.body.cpf.substring(0,11);
        execSQLQuery(`UPDATE Clientes SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`, res);
    })*/
}

const setCustomer = (req, body, next) => {
    const nome = req.body.nome || ''
    const telefone = req.body.telefone || ''
    const endereco = req.body.endereco || ''
    const pessoa = req.body.pessoa || '' 

    var conn = mysql.createConnection(webConfig.escdb);
    conn.connect();

    conn.query(`INSERT INTO TAB_PESSOA (NOME, TELEFONE) VALUES (?, ?);`  , nome, telefone,  
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                re.json(results);
            conn.end()

        })
    conn.query(`INSERT INTO TAB_CLIENTE (ENDERECO, PESSOA) VALUES (?, SELECT LAST_INSERT_ID());`  ,endereco,  
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                re.json(results);
            conn.end()

        })

        /*
SELECT LAST_INSERT_ID()
        */
    
    /*router.post('/clientes', (req, res) =>{
        const nome = req.body.nome.substring(0,150);
        const cpf = req.body.cpf.substring(0,11);
        execSQLQuery(`INSERT INTO Clientes(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
    })*/
}

const delCustomer = (req, body, next) => {
    const pessoa = req.body.pessoa || '' 

    var conn = mysql.createConnection(webConfig.escdb);
    conn.connect();

    conn.query(`DELETE TAB_CLIENTE WHERE PESSOA = ?;`  ,pessoa,  
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                re.json(results);
            conn.end()

        })

    conn.query(`DELETE TAB_PESSOA WHERE ID = ?;`  , pessoa,  
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                re.json(results);
            conn.end()

        })
    
    
    /*router.delete('/clientes/:id', (req, res) =>{
        execSQLQuery('DELETE FROM Clientes WHERE ID=' + parseInt(req.params.id), res);
    })*/
}

module.exports = { getCustomer ,  getAllCustomers, updateCustomer , setCustomer }


