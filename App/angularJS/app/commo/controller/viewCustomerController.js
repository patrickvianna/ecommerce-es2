(function() {
    angular.module('myApp').controller('ViewCustomerCtrl', ['$scope', '$http', 'consts', 'Msg', '$state', 'Customer', '$stateParams',  NewCustomerController])

    function NewCustomerController($scope, $http, consts, Msg, $state, Customer, $stateParams) {
        const vm = this

        vm.Customer = {
            id : 0,
            name : '',
            phone : '',
            address : ''
        }

        vm.Filter = {
            id : '',
            name : ''
        }

        vm.user = {
            login : 0,
            senha : 1
        }

        $scope.maskTel = "(99)99999-9999";

        function getCustomer () {
            const idRota = $stateParams.id
            const a = Customer.viewCustomer(idRota)
            vm.Customer = a.$$state
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

