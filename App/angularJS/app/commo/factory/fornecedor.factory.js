(function () {
    angular.module('myApp').factory('Fornecedor', ['$http', 'consts', '$q', function ($http, consts, $q){

        let idFornecedor;
        let razaoSocial;
        let cnpj;
        let telefone;
        let endereco;

        const Fornecedor = (razaoSocial,cnpj, telefone, endereco,idFornecedor) => {
            const Fornecedor = {
                idFornecedor : idFornecedor || '',
                razaoSocial : razaoSocial || '',
                cnpj: cnpj || '',
                telefone : telefone || '',
                endereco : endereco || ''
            }  
            
            return Fornecedor;
        }

        function registerFornecedor (razaoSocial,cnpj, telefone, endereco,idFornecedor) {
            return $q(function (resolve, reject){
                let cust = new Fornecedor(razaoSocial,cnpj, telefone, endereco,idFornecedor)
    
                $http.post(`${consts.apiUrl}/setFornecedor`, cust)
                    .then(resp => {
                        resolve(true)
                    }).catch(function (resp) {
                        reject(false)
                    })                    
            })   
        }

        function searchFornecedor  (id, razaoSocial) {
            return $q(function (resolve, reject){
                const cust = { id, razaoSocial}
                $http.get(`${consts.apiUrl}/getAllFornecedor`, cust)
                    .then(resp => {
                        resolve(resp.data)
                    }).catch(function (resp) {
                        reject(resp)
                    })                    
            })            
        }

        function viewFornecedor (id) {
            return $q(function (resolve, reject){
                const cust = { id }
    
                $http.post(`${consts.apiUrl}/getFornecedor`, cust)
                    .then(resp => {
                        resolve(resp.data[0])
                    }).catch(function (resp) {
                        reject(resp)
                    })
                    
            })  
        }

        function updateFornecedor (Fornecedor) {
            return $q(function (resolve, reject){
                //const cust = { id }
    
                $http.post(`${consts.apiUrl}/updateFornecedor`, Fornecedor.value)
                    .then(resp => {
                        resolve(true)
                    }).catch(function (resp) {
                        reject(false)
                    })
                    
            })  
        }

        function deleteFornecedor (idFornecedor) {
            return $q(function (resolve, reject){
                let cust = { idFornecedor}
                $http.post(`${consts.apiUrl}/delFornecedor`, cust)
                    .then(resp => {
                        resolve(true)
                    }).catch(function (resp) {
                        reject(false)
                    })                    
            })  
        }



        return { registerFornecedor , searchFornecedor, viewFornecedor, updateFornecedor, deleteFornecedor,Fornecedor };
    }])
})()