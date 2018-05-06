(function() {
    angular.module('myApp').controller('ViewFornecedorCtrl', ['$scope', '$http', 'consts', 'Msg', '$state', 'Fornecedor', '$stateParams',  NewFornecedorController])

    function NewFornecedorController($scope, $http, consts, Msg, $state, Fornecedor, $stateParams) {
        const vm = this

        vm.Fornecedor = {
            id : 0,
            razaoSocial : '',
            cnpj : '',
            telefone : '',
            address : ''
        }

        vm.Filter = {
            id : '',
            razaoSocial : ''
        }

        vm.user = {
            login : 0,
            senha : 1
        }

        $scope.maskTel = '(99)9999-9999';
        $scope.maskCnpj = '99.999.999/9999-99';

        function getFornecedor () {
            const idRota = $stateParams.id
            const a = Fornecedor.viewFornecedor(idRota)
            vm.Fornecedor = a.$$state
        }

        vm.updateFornecedor = () => {
            if(Fornecedor.updateFornecedor(vm.Fornecedor)){
                Msg.addSucess('O fornecedor foi alterado')
                $state.go('searchFornecedor')
            }                
            else 
                Msg.addError('Não foi possível atualizar os dados do fornecedor')
            
            $scope.contatoForm.$setPristine();
        }  
        
        //CHAMADA DA FUNÇÃO QUANDO ENTRA NO CONTROLLER
        getFornecedor()
    }
})()

