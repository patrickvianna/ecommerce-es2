(function () {
    angular.module('myApp').factory('Product', ['$http', 'consts', '$q', function ($http, consts, $q){

        let idProduct;
        let nome;
        let valor;

        const Product = (nome, valor) => {
            const Product = {
                nome : nome || '',
                valor : valor || ''
            }  
            
            return Product;
        }

        function registerProduct (nome, valor) {
            return $q(function (resolve, reject){
                let prod = new Product(nome, valor)
    
                $http.post(`${consts.apiUrl}/setProduct`, prod)
                    .then(resp => {
                        resolve(true)
                    }).catch(function (resp) {
                        reject(false)
                    })                    
            })   
        }

        function searchProduct  (id, name) {
            return $q(function (resolve, reject){
                const prod = { id, name }

                $http.post(`${consts.apiUrl}/getAllProducts`, prod)
                    .then(resp => {
                        resolve(resp.data)
                    }).catch(function (resp) {
                        reject(resp)
                    })                    
            })            
        }

        function viewProduct (id) {
            return $q(function (resolve, reject){
                const prod = { id }
    
                $http.post(`${consts.apiUrl}/getProduct`, prod)
                    .then(resp => {
                        resolve(resp.data[0])
                    }).catch(function (resp) {
                        reject(resp)
                    })
                    
            })  
        }

        function updateProduct (Product) {
            return $q(function (resolve, reject){
                $http.post(`${consts.apiUrl}/updateProduct`, Product.value)
                    .then(resp => {
                        resolve(true)
                    }).catch(function (resp) {
                        reject(false)
                    })                    
            })  
        }

        function deleteProduct (id) {
            return $q(function (resolve, reject){
                let prod = { id }
    
                $http.post(`${consts.apiUrl}/delProduct`, prod)
                    .then(resp => {
                        resolve(true)
                    }).catch(function (resp) {
                        reject(false)
                    })                    
            })  
        }



        return { registerProduct , searchProduct, viewProduct, updateProduct, deleteProduct, Product };
    }])
})()