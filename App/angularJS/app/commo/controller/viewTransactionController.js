(function() {
    angular.module('myApp').controller('ViewTransactionCrtl', ['$scope', '$http', 'consts', 'Msg', '$state', 'Transaction', '$stateParams',  ViewTransactionController])

    function ViewTransactionController($scope, $http, consts, Msg, $state, Transaction, $stateParams) {
        const vm = this

        vm.tr = {}

        vm.initObject = {
            total : 0,
            qtd : 0
        }

        function getCustomer () {
            const idRota = $stateParams.id
            const tipoRota = $stateParams.tipo
            if (idRota < 1 || (tipoRota != 'Venda' && tipoRota != 'Compra'))
                return
            Transaction.visualizar(idRota, tipoRota)
            .then((res) => {
                vm.tr = res.data
            }, (reason) => {
                console.log('reason :', reason);
            })
        }

        vm.updateCustomer = () => {
            if(Customer.updateCustomer(vm.Customer)){
                Msg.addSucess('O cliente foi alterado')
                $state.go('searchCustomer')
            }                
            else 
                Msg.addError('Não foi possível atualizar os dados do cliente')
            
            $scope.contatoForm.$setPristine();
        }  
        
        //CHAMADA DA FUNÇÃO QUANDO ENTRA NO CONTROLLER
        getCustomer()
    }
})()

