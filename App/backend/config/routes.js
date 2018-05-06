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
    
    
/*
    const ticketService = require('../api/ticket/ticketService')
    //ticketService.getTickets(protectedApi, 'getTickets')
    protectedApi.post('/getTickets', ticketService.getTickets)
    protectedApi.post('/getProjetos', ticketService.getProjetos)
    protectedApi.post('/getTicketProject', ticketService.getTicketProject)

    const newTicketService = require('../api/ticket/newTicketService')
    protectedApi.post('/setTickets', newTicketService.setTickets)
    protectedApi.post('/getTipo', newTicketService.getTipo)
    

    const detailTicketService = require('../api/ticket/detailTicketService')
    protectedApi.post('/getDetail', detailTicketService.getDetail)

    //protectedApi.route('/getTickets').get(ticketService.getTickets)
	protectedApi.use(auth)
*/
    /*const billingCycleService = require('../api/billingCycle/billingCycleService')
    billingCycleService.register(protectedApi, '/billingCycles')

    const billingSummaryService = require('../api/billingSummary/billingSummaryService')
    protectedApi.route('/billingSummary').get(billingSummaryService.getSummary)
*/
}
