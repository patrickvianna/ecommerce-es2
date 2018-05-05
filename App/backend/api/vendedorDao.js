//const restful = require('node-restful')
const mysql = require(`mysql`);
const escdb = require ('../config/web.config')

const getCustomer = (req, res, next) => {
    const customer = req.body.id || 0
    
    var conn = mysql.createConnection(escdb);
    conn.connect();

    conn.query("SELECT C.id, P.ID pessoa, P.NOME name, C.ENDERECO address, P.TELEFONE phone FROM TAB_CLIENTE C INNER JOIN TAB_PESSOA P ON C.PESSOA = P.ID WHERE C.ID = ?", customer,
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                res.json(results);
            conn.end()

        })
}

const getVendedores = (req, res, next) => {
    var conn = mysql.createConnection(escdb);
    conn.connect();

    conn.query("SELECT V.ID id, P.NOME name FROM TAB_VENDEDOR V INNER JOIN TAB_PESSOA P ON V.PESSOA = P.ID",
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                res.json(results);
            conn.end()

        })
}
const getVendedorVenda = (req, res, next) => {
    const id = req.body.id || 0
    
    var conn = mysql.createConnection(escdb);
    conn.connect();

    conn.query("SELECT 'Venda' tipo, V.ID id, V.DATA_VENDA data, V.VALOR valor  FROM TAB_VENDA V WHERE V.VENDEDOR = ?",
        id, function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                res.json(results);
            conn.end()

        })
}

const updateCustomer = (req, res, next) => {
    let id = req.body.id || ''
    const name = req.body.name || ''
    const phone = req.body.phone || ''
    const address = req.body.address || ''
    let pessoa = req.body.pessoa || ''

    pessoa = parseInt(pessoa)
    id = parseInt(id)
    

    console.log(req.body)
    var conn = mysql.createConnection(escdb);
    conn.connect();

    conn.query("UPDATE TAB_PESSOA  SET NOME = ?, TELEFONE = ? WHERE ID = ?"  , 
    [name, phone, pessoa], 
        function (error, results, fiels) {
            if (error)
                res.json(error)
            
            conn.query("UPDATE TAB_CLIENTE SET ENDERECO = ? WHERE PESSOA = ?"  , [address, pessoa], 
            function (error, results, fiels) {
                if (error)
                    res.json(error)
                else
                    res.json(results);
                conn.end()
    
            })
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
    
    var conn = mysql.createConnection(escdb);
    conn.connect();

    let params = [nome, telefone]

    conn.query(`INSERT INTO TAB_PESSOA (NOME, TELEFONE) VALUES (?, ?)`  , params,  
        function (error, results, fiels) {
            if (error)
                res.json(error)
                const idPessoa = results.insertId

            conn.query(`INSERT INTO TAB_CLIENTE (ENDERECO, PESSOA) VALUES (?, ?)`  ,
            [ endereco, idPessoa],  
                function (error, results, fiels) {
                    if (error)
                        res.json(error)
                    else
                        res.json(results);
                    conn.end()
        
                })
            
        })
    

    
    /*router.post('/clientes', (req, res) =>{
        const nome = req.body.nome.substring(0,150);
        const cpf = req.body.cpf.substring(0,11);
        execSQLQuery(`INSERT INTO Clientes(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
    })*/
}

const delCustomer = (req, res, next) => {
    let pessoa = req.body.pessoa || '' 
    let idCustomer = req.body.idCustomer || ''
    
    pessoa = parseInt(pessoa)
    idCustomer = parseInt(idCustomer)

    var conn = mysql.createConnection(escdb);
    conn.connect();

    conn.query(`DELETE FROM TAB_CLIENTE WHERE ID = ?`  ,idCustomer,  
        function (error, results, fiels) {
            console.log(error)
            if (error)
                res.json(error)
            
                conn.query(`DELETE FROM TAB_PESSOA WHERE ID = ?`  , pessoa,  
                function (error, results, fiels) {
                    console.log(results)
                    if (error)
                        res.json(error)
                    else
                        res.json(results);
                    conn.end()
        
                })
        })    
    
    
    /*router.delete('/clientes/:id', (req, res) =>{
        execSQLQuery('DELETE FROM Clientes WHERE ID=' + parseInt(req.params.id), res);
    })*/
}

module.exports = { getVendedores , getVendedorVenda, updateCustomer , setCustomer, delCustomer }


