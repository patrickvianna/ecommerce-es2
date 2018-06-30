//const restful = require('node-restful')
const mysql = require(`mysql`);
const escdb = require ('../config/web.config')

const sell = (req, res, next) => {
    const cliente = req.body.cliente || ''
    const produtos = req.body.produtos || ''
    const vendedor = req.body.vendedor || ''
    const total =  req.body.total || ''
    
    let idVenda = 0
    var conn = mysql.createConnection(escdb);
    conn.connect();
    try {
        conn.query("INSERT INTO TAB_VENDA (DATA_VENDA, VALOR, VENDEDOR, CLIENTE) VALUES (NOW(), ?, ?, ?)",
        [total, vendedor, cliente.id],  
           function (error, results, fiels) {
               if (error)
                   res.json(error)
               
               idVenda = results.insertId
   
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
           res.json({sucesso : idVenda})  
    } catch (error) {
        res.json({sucesso : false, error})
    }
    
}

const buy = (req, res, next) => {
    const fornecedor = req.body.fornecedor || ''
    const produtos = req.body.produtos || ''
    const total =  req.body.total || ''

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

const visualizarTransaction = (req, res, next) => {
    let id = req.body.id || ''
    const tipo = req.body.tipo || ''
    let cmd1, cmd2

    id = parseInt(id)
    
    let transactionDetail = {
        data : '',
        produtos : []
    }
    var conn = mysql.createConnection(escdb);
    conn.connect();
    
    if(tipo == 'Venda') {
        cmd1 = "SELECT V.id, 'Venda' tipo, V.VALOR total, V.DATA_VENDA data, VD.ID idVendedor, PV.NOME nomeVendedor, C.ID idCliente, PC.NOME nomeCliente"
        cmd1 += " FROM TAB_VENDA V " ;
        cmd1 += " INNER JOIN TAB_VENDEDOR VD ON V.VENDEDOR = VD.ID INNER JOIN TAB_PESSOA PV ON VD.PESSOA = PV.ID "  
        cmd1 += " INNER JOIN TAB_CLIENTE C ON V.CLIENTE = C.ID INNER JOIN TAB_PESSOA PC ON C.PESSOA = PC.ID "  
        cmd1 += " WHERE V.ID = ? "  

        cmd2 = "SELECT P.id, P.NOME nome, IV.QUANTIDADE qtd, IV.VALOR total, P.VALOR unitValue "
        cmd2 += "FROM TAB_ITEM_VENDA IV INNER JOIN TAB_PRODUTO P ON IV.PRODUTO = P.ID WHERE IV.VENDA = ?"
    } else {
        cmd1 = "SELECT C.id, 'Compra' tipo, C.VALOR total, C.DATA_COMPRA data, F.ID idFornecedor, F.RAZAO_SOCIAL razaoSocial, F.CNPJ "
        cmd1 += " FROM TAB_COMPRA C " ;
        cmd1 += " INNER JOIN TAB_FORNECEDOR F ON C.FORNECEDOR = F.ID "  
        cmd1 += " WHERE C.ID = ? "  

        cmd2 = "SELECT P.id, P.NOME nome, IC.QUANTIDADE qtd, IC.VALOR total, P.VALOR unitValue "
        cmd2 += "FROM TAB_ITEM_COMPRA IC INNER JOIN TAB_PRODUTO P ON IC.PRODUTO = P.ID WHERE IC.COMPRA = ?"
    }
    
    conn.query(cmd1, [id], 
        function (error, results, fiels) {
            if (error)
                res.json(error)
            
            transactionDetail.data = results[0]

            conn.query(cmd2 , [id], 
            function (error, results, fiels) {
                if (error)
                    res.json(error)
                else {
                    transactionDetail.produtos = results
                    res.json(transactionDetail)
                }
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

const estornar = (req, res, next) => {
    let id = req.body.id || 0
    
    var conn = mysql.createConnection(escdb);
    conn.connect();
    try {        
        conn.query("SELECT ID, QUANTIDADE, PRODUTO FROM TAB_ITEM_VENDA WHERE VENDA = ?", id,
            function (error, results, fiels) {
                if (error)
                    res.json(error)
                
                const lista = results
                lista.forEach(element => {
                    conn.query("UPDATE TAB_PRODUTO SET ESTOQUE = ESTOQUE + ? WHERE ID = ?", [element.QUANTIDADE, element.PRODUTO],
                    function (error, results, fiels) {
                        if (error)
                            res.json(error)
                    })
                });
                conn.query("DELETE FROM TAB_ITEM_VENDA WHERE VENDA = ?", [id],
                    function (error, results, fiels) {
                        if (error)
                            res.json(error)
                    })
                conn.query("DELETE FROM TAB_VENDA WHERE ID = ?", [id],
                    function (error, results, fiels) {
                        if (error)
                            res.json(error)
                    })
            })
    } catch (error) {
        console.log('error :', error);
    }    
}
module.exports = { sell , buy, getAllTransactions, visualizarTransaction , estornar }


