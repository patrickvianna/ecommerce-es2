//const restful = require('node-restful')
const mysql = require(`mysql`);
const escdb = require ('../config/web.config')

const getCustomer = (req, res, next) => {
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

const getAllCustomers = (req, res, next) => {
    var conn = mysql.createConnection(webConfig.escdb);
    conn.connect();

    conn.query("SELECT * FROM TAB_CLIENTE C INNER JOIN TAB_PESSOA P ON C.PESSOA = P.ID",
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                re.json(results);
            conn.end()

        })
}

const updateCustomer = (req, res, next) => {
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
    
    conn.query(`UPDATE TAB_CLIENTE SET ENDERECO = ${endereco} WHERE PESSOA = ?`  , pessoa, 
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

const setCustomer = (req, res, next) => {
    const nome = req.body.nome || ''
    const telefone = req.body.telefone || ''
    const endereco = req.body.endereco || ''
    const pessoa = req.body.pessoa || '' 

    console.log(nome)
    console.log(telefone)
    console.log(endereco)
    console.log(pessoa)
    
    console.log(escdb)
    var conn = mysql.createConnection(escdb);
    conn.connect();
    console.log('conectou')

    let params = [nome, telefone]

    conn.query(`INSERT INTO TAB_PESSOA (NOME, TELEFONE) VALUES (?, ?)`  , params,  
        function (error, results, fiels) {
            if (error)
                res.json(error)
            conn.query(`INSERT INTO TAB_PESSOA (NOME, TELEFONE) VALUES (?, ?)`  , params,  
                function (error, results, fiels) {
                
                    console.log(results)
                conn.query(`INSERT INTO TAB_CLIENTE (ENDERECO, PESSOA) VALUES (?, SELECT TOP 1 ID
                    FROM TAB_PESSOA ORDER BY ID DESC)`  ,endereco,  
                    function (error, results, fiels) {
                        if (error)
                            res.json(error)
                        else
                            res.json(results);
                        conn.end()
            
                    })
                })
        })
    

    
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

module.exports = { getCustomer ,  getAllCustomers, updateCustomer , setCustomer, delCustomer }


