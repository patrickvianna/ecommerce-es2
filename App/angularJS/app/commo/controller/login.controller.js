(function() {
    angular.module('myApp').controller('LoginCtrl', ['$http', 'Msg', 'Url', 'auth', '$location', '$window', LoginController])

    function LoginController($http, Msg, Url, auth, $location, $window) {
        const vm = this

        vm.loginMode = true

         vm.user = {
            login: '',
            senha: ''
        }

        vm.Cadastro = {
            name : '',
            telefone : '',
            login : '',
            senha : '',
            senhaConfirma : ''
        }

        //vm.changeMode = () => vm.loginMode = !vm.loginMode

        vm.logar = function() {
            if(vm.loginMode)
            {
                auth.login(vm.user, err => {
                    if (err) {
                        Msg.addError('Erro ao logar')
                    } else {
                        $location.path('/')
                        Msg.addSucess('Bem-vindo', 'Logado com sucesso!')
                    }
                })
            }else {
                signup()
            }
            
        }

        vm.changeMode = () => 
        {
            vm.loginMode = !vm.loginMode

            vm.Cadastro.name = ''
            vm.Cadastro.telefone = ''
            vm.Cadastro.login = ''
            vm.Cadastro.senha = ''
            vm.Cadastro.senhaConfirma = ''

            vm.user.login = ''
            vm.user.senha = ''           
        }
        /*
        vm.login = () => {
            auth.login(vm.user, err => err ? msgs.addError(err) : msgs.addSucess('Sucesso'))
        }*/
        vm.logout = ( a = 0) => {
            auth.logout(() => $location.path('/'))
            $location.path('/')

            a += 1
            if(a ==1 )
            {
                vm.logout(a)
            }                
        }

        const signup = () => {
            if(vm.Cadastro.senha != vm.Cadastro.senhaConfirma)
            {
                Msg.addWarn('Senhas não conferem')
                return;
            }
            auth.signup(vm.Cadastro, err => err ? Msg.addError(err) : Msg.addSucess('Usuário cadastrdado!'))
        }

        vm.getUser = () => auth.getUser()
        
    }
})()