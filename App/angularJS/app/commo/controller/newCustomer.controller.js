(function() {
    angular.module('myApp').controller('NewCustomer', ['$scope', '$http', 'consts', 'Msg', '$state', NewCustomerController])

    function NewCustomerController($scope, $http, consts, Msg, $state) {
        const vm = this

        vm.projetos = {
            lista : [],
            selectedOption: {id: '', name: ''} 
        }

        vm.tarefa = {
            idUser: '',
            titulo: '',
            descricao : '',
            tipo: '',
            prioridade: '',
            projeto: ''            
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

