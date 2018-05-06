(function () {
    angular.module('myApp').factory('Transaction', ['$http', 'consts', '$q', function ($http, consts, $q){

        function sell (cliente, produtos, vendedor, total) {
            return $q(function (resolve, reject){
                    
                const sellObject = {
                    cliente : cliente,
                    produtos : produtos,                    
                    vendedor : vendedor,
                    total : total
                }
                
                $http.post(`${consts.apiUrl}/sell`, sellObject)
                    .then(resp => {
                        resolve(true)
                    }).catch(function (resp) {
                        reject(false)
                    })
            })   
        }

        function buy (fornecedor, produtos, total) {
            return $q(function (resolve, reject){
                    
                const buyObject = {
                    fornecedor : fornecedor,
                    produtos : produtos,                    
                    total : total
                }
                
                $http.post(`${consts.apiUrl}/buy`, buyObject)
                    .then(resp => {
                        resolve(true)
                    }).catch(function (resp) {
                        reject(false)
                    })
            })   
        }

        function estornar (id) {
            return $q(function (resolve, reject){
    
                $http.post(`${consts.apiUrl}/estornar`, { id })
                    .then(resp => {
                        resolve(true)
                    }).catch(function (resp) {
                        reject(false)
                    })                    
            })  
        }

        function registerCustomer (nome, telefone, endereco, idPerson, idCustomer) {
            return $q(function (resolve, reject){
                let cust = new Customer(nome, telefone, endereco, idPerson, idCustomer)
    
                $http.post(`${consts.apiUrl}/setCustomer`, cust)
                    .then(resp => {
                        resolve(true)
                    }).catch(function (resp) {
                        reject(false)
                    })                    
            })   
        }

        function getAllTransactions  () {
            return $http.post(`${consts.apiUrl}/getAllTransactions`, {})
        }

        function visualizar (id, tipo) {
            return $http.post(`${consts.apiUrl}/visualizarTransaction`, { id, tipo })
        }




        return { sell , buy, getAllTransactions, visualizar, estornar };
    }])
})()