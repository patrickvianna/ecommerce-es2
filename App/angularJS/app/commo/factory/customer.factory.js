(function () {
    angular.module('myApp').factory('Customer', ['$http', 'consts', '$q', function ($http, consts, $q){

        let idPerson;
        let idCustomer;
        let nome;
        let telefone;
        let endereco;

        const Customer = (nome, telefone, endereco, idPerson, idCustomer) => {
            const Customer = {
                idPerson : idPerson || 0,
                idCustomer : idCustomer || '',
                nome : nome || '',
                telefone : telefone || '',
                endereco : endereco || ''
            }  
            
            return Customer;
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

        function searchCustomer  (id, name) {
            const cust = { id, name }
            return $http.post(`${consts.apiUrl}/getAllCustomers`, cust)
        }

        function viewCustomer (id) {
            return $q(function (resolve, reject){
                const cust = { id }
    
                $http.post(`${consts.apiUrl}/getCustomer`, cust)
                    .then(resp => {
                        resolve(resp.data[0])
                    }).catch(function (resp) {
                        reject(resp)
                    })
                    
            })  
        }

        function updateCustomer (Customer) {
            return $q(function (resolve, reject){
                //const cust = { id }

                $http.post(`${consts.apiUrl}/updateCustomer`, Customer.value)
                    .then(resp => {
                        resolve(true)
                    }).catch(function (resp) {
                        reject(false)
                    })
                    
            })  
        }

        function deleteCustomer (idCustomer, pessoa) {
            return $q(function (resolve, reject){
                let cust = { idCustomer, pessoa }
    
                $http.post(`${consts.apiUrl}/delCustomer`, cust)
                    .then(resp => {
                        resolve(true)
                    }).catch(function (resp) {
                        reject(false)
                    })                    
            })  
        }



        return { registerCustomer , searchCustomer, viewCustomer, updateCustomer, deleteCustomer, Customer };
    }])
})()