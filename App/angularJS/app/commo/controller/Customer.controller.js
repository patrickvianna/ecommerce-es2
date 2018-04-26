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
        }

        vm.user = {
            login : 0,
            senha : 1
        }

        vm.searchCustomer = () => {
            const a = Customer.searchCustomer(vm.Filter.id, vm.Filter.name)
            vm.lista = a.$$state
        
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

        /*vm.setTickets = () => {
            vm.tarefa.tipo = vm.tipo.idTipo
            vm.tarefa.prioridade = vm.severidade.idSeveridade
            vm.tarefa.projeto = vm.projetos.selectedOption.id
            vm.tarefa.idUser = JSON.parse(localStorage.getItem(consts.userKey)).id
            $http.post(`${consts.apiUrl}/setTickets`, vm.tarefa)
            .then(resp => {
                //vm.tickets = resp.data
                console.log(resp)
                $state.go('ticketList')
                Msg.addSucess('Criado com sucesso')
            }).catch(function (resp) {
                console.log(resp)
                Msg.addError('Ops, houve algo de errado')
            })
        }

        function getProjetos() {
                $http.post(`${consts.apiUrl}/getProjetos`, JSON.parse(localStorage.getItem(consts.userKey)))
                .then(resp => {
                    vm.projetos.lista = resp.data
                    vm.projetos.selectedOption = resp.data[0] || ''
                    console.log(resp.data)
                }).catch(resp => {
                    Msg.addError('Não foi possível carregar os projetos')
                })
            }
        

        getProjetos()*/
    }
})()

