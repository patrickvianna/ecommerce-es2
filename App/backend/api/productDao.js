//const restful = require('node-restful')
const mysql = require(`mysql`);
const escdb = require ('../config/web.config')

const getProduct = (req, res, next) => {
    const product = req.body.id || 0
    
    var conn = mysql.createConnection(escdb);
    conn.connect();

    conn.query("SELECT P.id, P.NOME name, P.VALOR price, P.ESTOQUE stock FROM TAB_PRODUTO P WHERE P.ID = ?", product,
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                res.json(results);
            conn.end()

        })
}

const getAllProducts = (req, res, next) => {
    let id = req.body.id || ''
    let name = req.body.name || ''

    var conn = mysql.createConnection(escdb);
    conn.connect();

    let comando = "SELECT P.id, P.NOME name, P.VALOR unitValue, P.ESTOQUE stock FROM TAB_PRODUTO P "
    let paramns = []

    if (id != '' || name != '')
    {
        comando = comando + " WHERE "
        if  (id != '' && name != '')
        {
            comando = comando + " P.ID = ? AND P.NOME = ?";
            paramns.push(parseInt(id))
            paramns.push(name)
        }else {
            if (id != '')
            {
                comando = comando + " P.ID = ?"
                paramns.push(parseInt(id))
            }else {
                if (name != '')
                {
                    comando = comando + " P.NOME = ?";
                    paramns.push(name)
                }
            }
        }
    }


    conn.query(comando, paramns,
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                res.json(results);
            conn.end()

        })
}

const updateProduct = (req, res, next) => {
    let id = req.body.id || ''
    const name = req.body.name || ''
    let price = req.body.price || ''
    price = parsed(price)
    id = parseInt(id)

    var conn = mysql.createConnection(escdb);
    conn.connect();

    conn.query("UPDATE TAB_PRODUTO SET NOME = ?, VALOR = ? WHERE ID = ?"  , 
    [name, price, id], 
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                res.json(results);
            conn.end()
        })
}

const setProduct = (req, res, next) => {
    const nome = req.body.nome || ''
    let valor = req.body.valor || '' 
    valor = parseFloat(valor)

    var conn = mysql.createConnection(escdb);
    conn.connect();

    let params = [nome, valor, 0]

    conn.query("INSERT INTO TAB_PRODUTO (NOME, VALOR, ESTOQUE) VALUES (?, ?, 0)"  , params,  
        function (error, results, fiels) {
            if (error)
                res.json(error)
            else
                res.json(results);
            conn.end()
        })
}

const delProduct = (req, res, next) => {
    let id = req.body.id || '' 
    id = parseInt(id)

    var conn = mysql.createConnection(escdb);
    conn.connect();

    conn.query(`DELETE FROM TAB_PRODUTO WHERE ID = ?`  ,id,  
        function (error, results, fiels) {
            console.log(error)
            if (error)
                res.json(error)
            else
                res.json(results);
            conn.end()
        })    
}

module.exports = { getProduct , getAllProducts, updateProduct , setProduct, delProduct }


