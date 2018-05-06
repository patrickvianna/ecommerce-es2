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
    let id = req.body.ID || ''
    const razaoSocial = req.body.RAZAO_SOCIAL || ''
    const cnpj = req.body.CNPJ || ''
    const telefone = req.body.TELEFONE || ''
    const address = req.body.ENDERECO || ''

    id = parseInt(id)
    
    var conn = mysql.createConnection(escdb);
    conn.connect();
   
    conn.query("UPDATE TAB_FORNECEDOR SET RAZAO_SOCIAL = ?,CNPJ = ?, TELEFONE = ?, ENDERECO = ? WHERE ID = ?"  , 
    [razaoSocial, cnpj, telefone, address, id], 
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                res.json(results);
            conn.end()
        })

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
    let id = req.body.idFornecedor || '' 
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


