    (function () {
        angular.module('myApp').controller('DashboardCtrl', ['$scope', '$http', 'consts', 'Msg', '$state', '$uibModal', '$q', 'Transaction', 'Vendedor', DashboardController])

        function DashboardController($scope, $http, consts, Msg, $state, $uibModal, $q, Transaction, Vendedor) {
            const vm = this

            vm.lista = {}

            vm.vendedores = {
                lista: [],
                selectedOption: { id: '', name: '' } //This sets the default value of the select in the ui
            }

            vm.visualizar = (id, tipo) => {
                $state.go('viewTransaction', { tipo, id})
            }

            vm.getAllTransactions = () => {
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

            vm.estornar = (id) => {
                if(Transaction.estornar(id)){
                    Msg.addSucess("Venda estornada!")
                } else {
                    Msg.addError('Houve algo de errado, não foi possível estornar a venda')
                }
            }


            //CHAMADA DAS FUNÇÕES
            vm.getVendedores()
            vm.getAllTransactions()                

        }
    })()


