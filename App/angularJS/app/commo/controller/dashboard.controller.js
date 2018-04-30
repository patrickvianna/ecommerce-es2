(function() {
    angular.module('myApp').controller('DashboardCtrl', ['$scope', '$http', 'consts', 'Msg', '$state', '$uibModal', 'Transaction', DashboardController])

    function DashboardController($scope, $http, consts, Msg, $state, $uibModal, Transaction) {
        const vm = this

        vm.Fornecedor = {
            id : '',
            name : '',
            phone : '',
            address : ''
        }
        vm.lista = {}

        function ProductBuild (id, name, unitValue, stock, qtd, total)
        {
            return  {
                id : '',
                name : '',
                unitValue : '',
                stock : '',
                qtd : '',
                total : ''
            }
        }

        vm.listProduct = []

        vm.Filter = {
            id : '',
            name : ''
        }

        vm.visualizar = (id, tipo) => {
            if (tipo == 'Venda')
            {

            }
        }

        function getAllTransactions (){
            console.log('DASHBOARD')
            const a = Transaction.getAllTransactions()
            console.log(a)
            vm.lista = a.$$state
        }

        vm.addProduct = () => {        
            if (vm.Product.qtd <= 0 || vm.Product.qtd == "")
            {
                Msg.addInfo("O produto tem que ter uma quantidade")
                return;
            }   
            let produtoInserido = false
            vm.listProduct.forEach(element => {
                if(vm.Product.id == element.id)
                {
                    Msg.addInfo("Você já adicionou esse produto");
                    produtoInserido = true
                }
            });
            if (produtoInserido)
                return;

            /*if (vm.Product.qtd > vm.Product.stock)
            {
                Msg.addInfo("Estoque insuficiente")
                return;
            }*/

            vm.Product.total = vm.Product.unitValue * vm.Product.qtd

            let p = new ProductBuild(vm.Product.id, vm.Product.name, vm.Product.unitValue, vm.Product.stock)
            p = angular.copy(vm.Product) 
            vm.listProduct.push(p)
            vm.Product.id = ''
            vm.Product.name = ''
            vm.Product.unitValue = ''
            vm.Product.qtd = ''
            vm.Product.stock = ''
            vm.Product.total = ''

            calcularTotal()
        }        

        vm.changeTotal = () => {
            vm.Product.total = vm.Product.unitValue * vm.Product.qtd
        }
        
        vm.deleteProduct = (item) => {          
            vm.listProduct.forEach(element => {
                if(element.id == item)
                    vm.listProduct.splice(element, 1)
            });            
            calcularTotal()
        }

        const calcularTotal = () => {
            if (vm.listProduct.length > 0)
            {
                vm.total = 0
                vm.listProduct.forEach(element => {
                    vm.total += element.total
                });
            } else 
                vm.total = 0
        }

        vm.buy = () => {
            if(vm.Fornecedor.id == '') {
                Msg.addInfo('Para finalizar a venda selecione o fornecedor')
                return;
            }
            if (vm.listProduct.length <= 0) {
                Msg.addInfo('Para finalizar a venda selecione pelo menos 1 produto')
                return;
            }

            calcularTotal()

            const resultado = Transaction.buy(vm.Fornecedor, vm.listProduct, vm.total)
            if(resultado)
            {
                Msg.addSucess("Compra realizada com sucesso")
                $state.go('dashboard')                
            }else {
                Msg.addError('Houve algo de errado, não foi possível completar a compra')
            }
        }      

        getAllTransactions()
        
    }
})()


