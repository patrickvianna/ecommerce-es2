//const restful = require('node-restful')
const mysql = require(`mysql`);
const escdb = require ('../config/web.config')

const sell = (req, res, next) => {
    const cliente = req.body.cliente || ''
    const produtos = req.body.produtos || ''
    const vendedor = req.body.vendedor || ''
    const total =  req.body.total || ''
    
    var conn = mysql.createConnection(escdb);
    conn.connect();
    try {
        conn.query("INSERT INTO TAB_VENDA (DATA_VENDA, VALOR, VENDEDOR, CLIENTE) VALUES (NOW(), ?, ?, ?)",
        [total, vendedor, cliente.id],  
           function (error, results, fiels) {
               if (error)
                   res.json(error)
               
               const idVenda = results.insertId
   
               produtos.forEach(element => {
                   conn.query("INSERT INTO TAB_ITEM_VENDA (QUANTIDADE, VALOR, VENDA, PRODUTO) VALUES (?, ?, ?, ?)",
                   [element.qtd, element.total, idVenda, element.id ],  
                       function (error, results, fiels) {
                           if (error)
                               res.json(error)
                       })
                    const update = element.stock - element.qtd
                    conn.query("UPDATE TAB_PRODUTO SET ESTOQUE = ? WHERE ID = ?",
                    [update, element.id],  
                        function (error, results, fiels) {
                            if (error)
                                res.json(error)
                        })
               });
               conn.end()
           })  
           res.json({sucesso : true})  
    } catch (error) {
        res.json({sucesso : false, error})
    }
    
}

const buy = (req, res, next) => {
    const fornecedor = req.body.fornecedor || ''
    const produtos = req.body.produtos || ''
    const total =  req.body.total || ''

    console.log(req.body)
    
    var conn = mysql.createConnection(escdb);
    conn.connect();
    try {
        conn.query("INSERT INTO TAB_COMPRA (DATA_COMPRA, VALOR, FORNECEDOR) VALUES (NOW(), ?, ?)",
        [total, fornecedor.id],  
           function (error, results, fiels) {
               if (error)
                   res.json(error)
               
               const idCompra = results.insertId
   
               produtos.forEach(element => {
                   conn.query("INSERT INTO TAB_ITEM_COMPRA (QUANTIDADE, VALOR, COMPRA, PRODUTO) VALUES (?, ?, ?, ?)",
                   [element.qtd, element.total, idCompra, element.id ],  
                       function (error, results, fiels) {
                           if (error)
                               res.json(error)
                       })
                    const update = element.qtd + element.stock
                    conn.query("UPDATE TAB_PRODUTO SET ESTOQUE = ? WHERE ID = ?",
                    [update, element.id],  
                        function (error, results, fiels) {
                            if (error)
                                res.json(error)                        
                        })
                });
                conn.end()
           })  
           res.json({sucesso : true})  
    } catch (e) {
        res.json({sucesso : false, e})
    }
    
}

const getAllTransactions = (req, res, next) => {
    var conn = mysql.createConnection(escdb);
    conn.connect();

    conn.query("SELECT * FROM (SELECT 'Venda' tipo, ID id, DATA_VENDA data, VALOR valor FROM TAB_VENDA UNION ALL SELECT 'Compra' tipo, ID id, DATA_COMPRA data, VALOR valor  FROM TAB_COMPRA) AS TAB ORDER BY data DESC",
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
            {
                res.json(results);
            }
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

module.exports = { sell , buy, getAllTransactions, updateCustomer , setCustomer, delCustomer }


