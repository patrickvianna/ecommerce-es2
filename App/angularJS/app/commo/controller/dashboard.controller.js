    (function () {
        angular.module('myApp').controller('DashboardCtrl', ['$scope', '$http', 'consts', 'Msg', '$state', '$uibModal', '$q', 'Transaction', 'Vendedor', DashboardController])

        function DashboardController($scope, $http, consts, Msg, $state, $uibModal, $q, Transaction, Vendedor) {
            const vm = this

            vm.Fornecedor = {
                id: '',
                name: '',
                phone: '',
                address: ''
            }
            vm.lista = {}

            vm.vendedores = {
                lista: [],
                selectedOption: { id: '', name: '' } //This sets the default value of the select in the ui
            }

            function ProductBuild(id, name, unitValue, stock, qtd, total) {
                return {
                    id: '',
                    name: '',
                    unitValue: '',
                    stock: '',
                    qtd: '',
                    total: ''
                }
            }

            vm.listProduct = []

            vm.Filter = {
                id: '',
                name: ''
            }

            vm.visualizar = (id, tipo) => {
                console.log('entrei :', id, tipo);
                $state.go('viewTransaction', { tipo, id})
            }

            vm.getAllTransactions = () => {
                console.log('DASHBOARD')
                Transaction.getAllTransactions()
                .then((res) => {
                    vm.lista = res.data
                })
            }

            vm.getVendedores = () => {
                return $q(function (resolve, reject) {
                    const a = Vendedor.getAll()
                    vm.vendedores.lista = a.$$state
                    vm.vendedores.selectedOption = vm.vendedores.lista[0]
                    //console.log(vm.vendedores)
                    resolve()
                })
            }

            vm.getVendedorVenda = () => {
                if(vm.vendedores.selectedOption.id != undefined) {
                    Vendedor.getVendedorVenda(vm.vendedores.selectedOption.id)
                        .then((res) => {
                            vm.lista = res.data
                            if(res.data.length < 1)
                                Msg.addInfo('Esse vendedor ainda não tem venda')
                        })
                }
            }


            //CHAMADA DAS FUNÇÕES
            vm.getVendedores()
            vm.getAllTransactions()                

        }
    })()


