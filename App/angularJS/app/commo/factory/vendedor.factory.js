(function () {
    angular.module('myApp').factory('Vendedor', ['$http', 'consts', '$q', function ($http, consts, $q) {

        let idPerson;
        let idCustomer;
        let nome;
        let telefone;
        let endereco;

        const Customer = (nome, telefone, endereco, idPerson, idCustomer) => {
            const Customer = {
                idPerson: idPerson || 0,
                idCustomer: idCustomer || '',
                nome: nome || '',
                telefone: telefone || '',
                endereco: endereco || ''
            }

            return Customer;
        }

        function getAll() {
            return $q(function (resolve, reject) {

                $http.post(`${consts.apiUrl}/getVendedores`)
                    .then(resp => {
                        resolve(resp.data)
                    }).catch(function (resp) {
                        reject(resp)
                    })
            })
        }

        function getVendedorVenda(id) {
            return $http.post(`${consts.apiUrl}/getVendedorVenda`, { id });
        }

        return { getAll, getVendedorVenda };
    }])
})()