(function() {
    angular.module('myApp').controller('ProductCtrl', ['$scope', '$http', 'consts', 'Msg', '$state', 'Product', ProductController])

    function ProductController($scope, $http, consts, Msg, $state, Product) {
        const vm = this

        vm.Product = {
            id : 0,
            name : '',
            price : '',
            stock :  ''
        }

        vm.Filter = {
            id : '',
            name : ''
        }

        vm.lista = { a : 0}

        vm.registerProduct = () => {
            let retorno = Product.registerProduct(vm.Product.name, vm.Product.price);

            if(retorno)
            {
                Msg.addSucess("Produto inserido")
                vm.Product.name = ""
                vm.Product.price = ""
            }                
            else    
                Msg.addError("Houve um erro ao inserir o produto")                
        }

        vm.searchProduct = () => {
            const a = Product.searchProduct(vm.Filter.id, vm.Filter.name)
            vm.lista = a.$$state
        }

        vm.goToViewProduct = (idProduct) => {
            console.log('visao')
            $state.go('viewProduct', { id: idProduct })
        }

        vm.goToUpdateProduct = (idProduct) => {
            $state.go('updateProduct', { id: idProduct })
        }

        vm.deleteProduct = (id) => {
            let retorno = Product.deleteProduct(id);

            if(retorno)
            {
                vm.searchProduct();
                Msg.addSucess("Produto deletado")
            }else {
                Msg.addError("Não foi possível excluir o produto")
            }
        }
    }
})()
