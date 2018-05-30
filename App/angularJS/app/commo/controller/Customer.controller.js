(function() {
    angular.module('myApp').controller('CustomerCtrl', ['$scope', '$http', 'consts', 'Msg', '$state', 'Customer', CustomerController])

    function CustomerController($scope, $http, consts, Msg, $state, Customer) {
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

        vm.lista = { a : 0}

        vm.registerCustomer = () => {
            let retorno = Customer.registerCustomer(vm.Customer.name, vm.Customer.phone, vm.Customer.address, 1, 4);

            if(retorno)
            {
                Msg.addSucess("Cliente inserido")
                vm.Customer.name = ""
                vm.Customer.phone = ""
                vm.Customer.address = ""
            }                
            else    
                Msg.addError("Houve um erro ao inserir o cliente")
            
            $scope.contatoForm.$setPristine();
        }

        vm.user = {
            login : 0,
            senha : 1
        }

        $scope.maskTel = "(99)99999-9999";

        vm.searchCustomer = () => {
            
            Customer.searchCustomer(vm.Filter.id, vm.Filter.name)
                .then ((res) => {
                    vm.lista = res.data
                }, (reason) => {
                    Msg.addError(reason)
                })
        }

        vm.goToViewCustomer = (idCustomer) => {
            $state.go('viewCustomer', { id: idCustomer })
            /*const a = Customer.viewCustomer(idCustomer)
            vm.Customer = a.$$state
            console.log(a)
            console.log(vm.Customer)
            */
        }

        vm.goToUpdateCustomer = (idCustomer) => {
            $state.go('updateCustomer', { id: idCustomer })
        }

        vm.deleteCustomer = (idCustomer, pessoa) => {
            let retorno = Customer.deleteCustomer(idCustomer, pessoa);

            if(retorno)
            {
                vm.searchCustomer();
                Msg.addSucess("Cliente deletado")
            }else {
                Msg.addError("Não foi possível excluir o cliente")
            }
        }
    }
})()

