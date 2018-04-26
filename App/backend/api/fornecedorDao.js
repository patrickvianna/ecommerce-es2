//const restful = require('node-restful')
const mysql = require(`mysql`);
const escdb = require ('../config/web.config')

const getFornecedor = (req, res, next) => {
    const fornecedor = req.body.id || 0
    
    var conn = mysql.createConnection(escdb);
    conn.connect();

    conn.query("SELECT ID,RAZAO_SOCIAL,CNPJ,TELEFONE,ENDERECO FROM TAB_FORNECEDOR WHERE ID = ?", fornecedor,
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                res.json(results);
            conn.end()

        })
}

const getAllFornecedor = (req, res, next) => {
    console.log('entrei')
    var conn = mysql.createConnection(escdb);
    conn.connect();

    conn.query("SELECT ID, RAZAO_SOCIAL, CNPJ, TELEFONE, ENDERECO FROM TAB_FORNECEDOR",
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                res.json(results);
            conn.end()

        })
}

const updateFornecedor = (req, res, next) => {
    let id = req.body.id || ''
    const razaoSocial = req.body.razaoSocial || ''
    const cnpj = req.body.cnpj || ''
    const telefone = req.body.telefone || ''
    const address = req.body.address || ''
    

    id = parseInt(id)
    

    console.log(req.body)
    var conn = mysql.createConnection(escdb);
    conn.connect();

    conn.query("UPDATE TAB_FORNECEDOR SET RAZAO_SOCIAL = ?,CNPJ = ?, TELEFONE = ?, ENDERECO = ? WHERE ID = ?"  , 
    [razaoSocial, cnpj, telefone, endereco, id], 
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                res.json(results);
            conn.end()
        })
    
    
    /*router.patch('/clientes/:id', (req, res) =>{
        const id = parseInt(req.params.id);
        const nome = req.body.nome.substring(0,150);
        const cpf = req.body.cpf.substring(0,11);
        execSQLQuery(`UPDATE Clientes SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`, res);
    })*/
}

const setFornecedor = (req, res, next) => {
    const razaoSocial = req.body.razaoSocial || ''
    const cnpj = req.body.cnpj || ''
    const telefone = req.body.telefone || ''
    const endereco = req.body.endereco || ''
   
    
    var conn = mysql.createConnection(escdb);
    conn.connect();

    let params = [razaoSocial, cnpj, telefone, endereco]

    conn.query(`INSERT INTO TAB_FORNECEDOR (RAZAO_SOCIAL, CNPJ, TELEFONE, ENDERECO) VALUES (?, ?, ?, ?)`  , params,  
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                res.json(results);
            conn.end()
        })
    

    
    /*router.post('/clientes', (req, res) =>{
        const nome = req.body.nome.substring(0,150);
        const cpf = req.body.cpf.substring(0,11);
        execSQLQuery(`INSERT INTO Clientes(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
    })*/
}

const delFornecedor = (req, res, next) => {
    let id = req.body.id || '' 
    id = parseInt(id)

    var conn = mysql.createConnection(escdb);
    conn.connect();

    conn.query(`DELETE FROM TAB_FORNECEDOR WHERE ID = ?`  ,id,  
        function (error, results, fiels) {
            console.log(error)
            if (error)
                res.json(error)
            else
                res.json(results);
            conn.end()
        })    
}

module.exports = { getFornecedor ,  getAllFornecedor, updateFornecedor , setFornecedor, delFornecedor }


