(function () {
    angular.module('myApp').factory('Vendedor', ['$http', 'consts', '$q', function ($http, consts, $q) {

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