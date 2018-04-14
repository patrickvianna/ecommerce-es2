const restful = requere('node-restful')
const mysql = require(`mysql`);
const webConfig = require ('../config/server')

const getCustomer = (req, body, next) => {
    router.get('/clientes/:id?', (req, res) =>{
        let filter = '';
        if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
        execSQLQuery('SELECT * FROM Clientes' + filter, res);
    })
}

const getAllCustomers = (req, body, next) => {

}

const updateCustomer = (req, body, next) => {
    router.patch('/clientes/:id', (req, res) =>{
        const id = parseInt(req.params.id);
        const nome = req.body.nome.substring(0,150);
        const cpf = req.body.cpf.substring(0,11);
        execSQLQuery(`UPDATE Clientes SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`, res);
    })
}

const setCustomer = (req, body, next) => {
    router.post('/clientes', (req, res) =>{
        const nome = req.body.nome.substring(0,150);
        const cpf = req.body.cpf.substring(0,11);
        execSQLQuery(`INSERT INTO Clientes(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
    })
}

const delCustomer = (req, body, next) => {
    router.delete('/clientes/:id', (req, res) =>{
        execSQLQuery('DELETE FROM Clientes WHERE ID=' + parseInt(req.params.id), res);
    })
}

module.exports = { getCustomer ,  getAllCustomers, updateCustomer , setCustomer }


