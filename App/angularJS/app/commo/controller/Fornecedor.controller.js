(function() {
    angular.module('myApp').controller('FornecedorCtrl', ['$scope', '$http', 'consts', 'Msg', '$state', 'Fornecedor', FornecedorController])

    function FornecedorController($scope, $http, consts, Msg, $state, Fornecedor) {
        const vm = this

        vm.Fornecedor = {
            id : 0,
            razaoSocial : '',
            cnpj : '',
            telefone: '',
            address : ''
        }

        vm.Filter = {
            id : '',
            razaoSocial : ''
        }

        vm.lista = { a : 0}

        $scope.maskTel = '(99)9999-9999';
        $scope.maskCnpj = '99.999.999/9999-99';

        vm.registerFornecedor = () => {
            let retorno = Fornecedor.registerFornecedor(vm.Fornecedor.razaoSocial, vm.Fornecedor.cnpj,vm.Fornecedor.telefone, vm.Fornecedor.address);

            if(retorno)
            {
                Msg.addSucess("Fornecedor inserido")
                vm.Fornecedor.razaoSocial = ""
                vm.Fornecedor.cnpj = ""
                vm.Fornecedor.telefone = ""
                vm.Fornecedor.address = ""
                
            }                
            else    
                Msg.addError("Houve um erro ao inserir o fornecedor")  
            
            $scope.contatoForm.$setPristine();              
        }

        vm.user = {
            login : 0,
            senha : 1
        }

        vm.searchFornecedor = () => {
            const a = Fornecedor.searchFornecedor(vm.Filter.id, vm.Filter.razaoSocial)
            vm.lista = a.$$state
            //console.log(vm.lista);
        }

        vm.goToViewFornecedor = (idFornecedor) => {
            $state.go('viewFornecedor', { id: idFornecedor })
            /*const a = Fornecedor.viewFornecedor(idFornecedor)
            vm.Fornecedor = a.$$state
            console.log(a)
            console.log(vm.Forneccedor)
            */
        }

        vm.goToUpdateFornecedor = (idFornecedor) => {
            $state.go('updateFornecedor', { id: idFornecedor })
        }

        vm.deleteFornecedor = (idFornecedor) => {
            let retorno = Fornecedor.deleteFornecedor(idFornecedor);
            

            if(retorno)
            {
                vm.searchFornecedor();
                Msg.addSucess("Fornecedor deletado")
            }else {
                Msg.addError("Não foi possível excluir o fornecedor")
            }
        }

       
    }
})()

