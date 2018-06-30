const express = require('express')
//const auth = require('./auth')

module.exports = function (server) {

    /*
     * Rotas abertas
     */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)

    /*
     * Rotas protegidas por Token JWT
     */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)
    //const teste = require('../api/createTable')
    //protectedApi.post('/getTeste', teste.getTeste)

    const customer = require('../api/customerDao')
    protectedApi.post('/getCustomer', customer.getCustomer)
    protectedApi.post('/getAllCustomers', customer.getAllCustomers)
    protectedApi.post('/updateCustomer', customer.updateCustomer)
    protectedApi.post('/setCustomer', customer.setCustomer)
    protectedApi.post('/delCustomer', customer.delCustomer)

    const product = require('../api/productDao')
    protectedApi.post('/getProduct', product.getProduct)
    protectedApi.post('/getAllProducts', product.getAllProducts)
    protectedApi.post('/updateProduct', product.updateProduct)
    protectedApi.post('/setProduct', product.setProduct)
    protectedApi.post('/delProduct', product.delProduct)

    const fornecedor = require('../api/fornecedorDao')
    protectedApi.post('/getFornecedor', fornecedor.getFornecedor)
    protectedApi.post('/getAllFornecedor', fornecedor.getAllFornecedor)
    protectedApi.post('/updateFornecedor', fornecedor.updateFornecedor)
    protectedApi.post('/setFornecedor', fornecedor.setFornecedor)
    protectedApi.post('/delFornecedor', fornecedor.delFornecedor)

    const transaction = require('../api/transactionDao')
    protectedApi.post('/sell', transaction.sell)
    protectedApi.post('/buy', transaction.buy)
    protectedApi.post('/getAllTransactions', transaction.getAllTransactions)
    protectedApi.post('/visualizarTransaction', transaction.visualizarTransaction)
    protectedApi.post('/estornar', transaction.estornar)
    
    const vendedor = require('../api/vendedorDao')
    protectedApi.post('/getVendedores', vendedor.getVendedores)
    protectedApi.post('/getVendedorVenda', vendedor.getVendedorVenda)
    
    const payment = require('../api/payments')
    protectedApi.post('/payments/pay', payment.pay)
    protectedApi.post('/payments/consultarVenda', payment.consultarVenda)
    protectedApi.post('/payments/estornarVenda', payment.estornarVenda)
}
