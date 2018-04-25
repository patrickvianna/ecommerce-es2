(function() {
    angular.module('myApp').controller('ViewProductCtrl', ['$scope', '$http', 'consts', 'Msg', '$state', 'Product', '$stateParams',  NewProductController])

    function NewProductController($scope, $http, consts, Msg, $state, Product, $stateParams) {
        const vm = this

        vm.Product = {
            id : 0,
            name : '',
            price : '',
            stock  :''
        }

        vm.Filter = {
            id : '',
            name : ''
        }

        function getProduct () {
            const idRota = $stateParams.id
            const a = Product.viewProduct(idRota)
            vm.Product = a.$$state
        }

        vm.updateProduct = () => {
            if(Product.updateProduct(vm.Product)){
                Msg.addSucess('O produto foi alterado')
                $state.go('searchProduct')
            }                
            else 
                Msg.addError('Não foi possível atualizar os dados do produto')
        }  
        
        //CHAMADA DA FUNÇÃO QUANDO ENTRA NO CONTROLLER
        getProduct()
    }
})()

