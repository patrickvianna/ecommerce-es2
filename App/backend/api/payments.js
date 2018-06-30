const rp = require('request-promise')
var parser = require('xml2js').parseString
const http = require('http')
const request = require('request')
//var PagSeguro = require('node-pagseguro');

const url = "http://localhost:50580/api/"

const pay = (req, res, next) => {
    const nome = req.body.nome || ""
    const itens = req.body.itens || ""
    const valor = req.body.valor || ""
    const qtd = req.body.qtd || ""
    const code = req.body.code || ""
    
    request.get(`${url}PagSeguroWSCheckout/?nomeCliente=${nome}&itens=${itens}&valorTotal=${valor}&quantidade=${qtd}&telefone=279898998&codigo=${code}`, 
        function(error, response, body) {
            console.log('code :', code);
            console.log('response :', response.body);
            res.json(response.body)
    })
}

const consultarVenda = (req, res, next) => {
    const code = req.body.code || ""
    
    request.get(`${url}PagSeguroWSConsultar/?referencia=${code}`, 
        function(error, response, body) {
            console.log('response :', response);
            res.json(response)
    })
}

const estornarVenda = (req, res, next) => {
    const code = req.body.code || ""
    
    request.get(`${url}PagSeguroWSEstorno/?referencia=${code}`, 
        function(error, response, body) {
            console.log('response :', response);
            res.json(response)
    })
}
 
module.exports = { pay, consultarVenda, estornarVenda }