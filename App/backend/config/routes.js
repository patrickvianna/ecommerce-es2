const express = require('express')
//const auth = require('./auth')

module.exports = function (server) {

    /*
     * Rotas abertas
     */
    /*const openApi = express.Router()
    server.use('/oapi', openApi)

    const AuthService = require('../api/user/authService')
    openApi.post('/login', AuthService.login)
    openApi.post('/signup', AuthService.signup)
    openApi.post('/validateToken', AuthService.validateToken)
*/
    /*
     * Rotas protegidas por Token JWT
     */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)
    const teste = require('../api/createTable')
    protectedApi.post('/getTeste', teste.getTeste)

    const customer = require('../api/customerDao')
    protectedApi.get('/getCustomer', customer.getCustomer)
    protectedApi.get('/getAllCustomers', customer.getAllCustomers)
    protectedApi.patch('/updateCustomer', customer.updateCustomer)
    protectedApi.post('/setCustomer', customer.setCustomer)
    protectedApi.delete('/delCustomer', customer.delCustomer)
    
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
