(function() {
    angular.module('myApp').controller('SellCtrl', ['$scope', '$http', 'consts', 'Msg', '$state', '$uibModal', 'Customer', 'Transaction', SellController])

    function SellController($scope, $http, consts, Msg, $state, $uibModal, Customer, Transaction) {
        const vm = this

        vm.Customer = {
            id : '',
            name : '',
            phone : '',
            address : ''
        }

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
        vm.total = 0

        vm.Filter = {
            id : '',
            name : ''
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

            if (vm.Product.qtd > vm.Product.stock)
            {
                Msg.addInfo("Estoque insuficiente")
                return;
            }

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

        vm.sell = () => {
            if(vm.Customer.id == '') {
                Msg.addInfo('Para finalizar a venda selecione o cliente')
                return;
            }
            if (vm.listProduct.length <= 0) {
                Msg.addInfo('Para finalizar a venda selecione pelo menos 1 produto')
                return;
            }

            calcularTotal()

            const vendedor = JSON.parse(localStorage.getItem(consts.userKey)).id

            const resultado = Transaction.sell(vm.Customer, vm.listProduct, vendedor, vm.total)
            if(resultado)
            {
                Msg.addSucess("Venda realizada com sucesso")
                $state.go('dashboard')                
            }else {
                Msg.addError('Houve algo de errado, não foi possível completar a venda')
            }
        }      

        vm.getProduct = () => {
            $uibModal.open({
                template: '<product-modal /*tarefa="$ctrl.tarefa"*/ $close="$close(result)" $dismiss="$dismiss(reason)"></product-modal>',
                controller: [ function() {
                    const $ctrl = this
                    //const rota = id
                    /*$http.post(`${consts.apiUrl}/getDetail`, {rota})
                    .then(function(resp){
                        $ctrl.tarefa = resp.data.issue
                        console.log($ctrl.tarefa)
                    }).catch(function(resp){
                        console.log(resp)
                    })*/
                }],
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                }
            }).result.then(function(result) {
                //console.info("I was closed, so do what I need to do myContent's controller now and result was->");
                vm.Product = new ProductBuild(result.id, result.name, result.unitValue, result.stock)
                
                vm.Product.id = result.id
                vm.Product.name = result.name
                vm.Product.unitValue = result.unitValue
                vm.Product.stock = result.stock
                
            }, function(reason) {
                //console.info("I was dimissed, so do what I need to do myContent's controller now and reason was->"+reason);
            });
        }

        vm.getCustomer = () => {                        
            $uibModal.open({
                template: '<customer-modal /*tarefa="$ctrl.tarefa"*/ $close="$close(result)" $dismiss="$dismiss(reason)"></customer-modal>',
                controller: [ function() {
                    const $ctrl = this
                    //const rota = id
                    /*$http.post(`${consts.apiUrl}/getDetail`, {rota})
                    .then(function(resp){
                        $ctrl.tarefa = resp.data.issue
                        console.log($ctrl.tarefa)
                    }).catch(function(resp){
                        console.log(resp)
                    })*/
                }],
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                }
            }).result.then(function(result) {
                //console.info("I was closed, so do what I need to do myContent's controller now and result was->");
                //console.info(result);
                vm.Customer = result
            }, function(reason) {
                //console.info("I was dimissed, so do what I need to do myContent's controller now and reason was->"+reason);
            });
        }
    }
})()


