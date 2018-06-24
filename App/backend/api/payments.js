const rp = require('request-promise')
var parser = require('xml2js').parseString
const http = require('http')
const request = require('request')

const pay = (req, res, next) => {
 
    const option = {
        url: 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout/?email=patrickviannapblv@gmail.com&token=3453C14C766E41CF80058DB20C456CA2',
        headers: {
            //'Content-type': 'application/json;charset=UTF-8',
            'Content-type': 'application/x-www-form-urlencoded;;charset=UTF-8',
            'Accept': 'application/vnd.pagseguro.com.br.v3+json;charset=UTF-8'
        }
    }
    
    request.post(option, 
        function(error, response, body) {
            //console.log('response :', response);
            res.json(response)
    })


/*    try { 
       // res.json({ RETORNO : "ENTROU AQUI MESMO, PAYMENTS"});
        //Recupere os dados do seu usuário, recomendo o squel para as           consultas sql
        console.log('ENTREI NO PAY :');
        var options = {
 
            method: 'POST',
 
            uri: 'https://ws.sandbox.pagseguro.uol.com.br/v2/pre-approvals/request',
 
            form: {
 
                email : 'patrickviannapblv@gmail.com',
 
                token: '3453C14C766E41CF80058DB20C456CA2',
 
                currency: 'BRL',
 
                preApprovalCharge: 'auto',
 
                preApprovalName: 'Assinatura 1',
 
                preApprovalDetails: 'Cobranca mensal',
 
                preApprovalAmountPerPayment: '249.91',
 
                preApprovalPeriod: 'monthly',
 
                preApprovalMaxTotalAmount: '249.91',
 
                reference: '654987asd987asdf', //ID para vc identificar a venda
 
                senderName: 'NOME_DO_CABA',
 
              senderCPF: CPF,
 
              senderAreaCode: 'TE',
 
              senderPhone: 'LEFONE',
 
              senderEmail: 'EMAIL_DO_COMPRADOR',
 
              senderHash: params.senderHash, //A API te retorna,
 
              installmentQuantity: '1', // Parcelamento
 
              installmentValue: '249.91',
 
              noInterestInstallmentQuantity: '12',
 
              creditCardToken: params.user.cardToken,
 
              creditCardHolderName: 'Nome do usuário',
 
              creditCardHolderCPF: 'CPF',
 
              creditCardHolderBirthDate: 'DATA_NASCIMENTO',
 
              creditCardHolderAreaCode: 'TE',
 
              creditCardHolderPhone: 'LEFONE',
 
              billingAddressStreet: 'ENDERECO_DO_MELIANTE',
 
              billingAddressNumber: 'NUMERO_QUE_NINGUEM_ENTENDE',
 
              billingAddressComplement: 'COMPLEMENTO',
 
              billingAddressDistrict: 'DISTRITO',
 
              billingAddressPostalCode: 'CEP',
 
              billingAddressCity: 'CIDADE',
 
              billingAddressState: 'ESTADO',
 
              billingAddressCountry: 'BRA'
 
            }
 
        }
 
          var response = {}
 
          rp(options).then(function(xml) {
 
            parseString(xml, function (err, result) {
                console.log('response :', response);
                response = result
 
            })
 
        }).catch(function(err) {
 
            response = err
 
        })
 
        this.body = response
 
    }catch(error) { 
        this.body = {error: error.message}
    }*/ 
}
 
module.exports = { pay }