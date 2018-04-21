(function () {
    angular.module('myApp').factory('Customer', ['$http', 'consts', function ($http, consts){

        let idPerson;
        let idCustomer;
        let nome;
        let telefone;
        let endereco;

        const Customer = (nome, telefone, endereco, idPerson, idCustomer) => {
            const Customer = {
                idPerson : idPerson || 0,
                idCustomer : idCustomer || '',
                nome : nome || '',
                telefone : telefone || '',
                endereco : endereco || ''
            }  
            
            return Customer;
        }

        function registerCustomer (nome, telefone, endereco, idPerson, idCustomer) {
            console.log("ENTREI AQUI")
            let cust = new Customer(nome, telefone, endereco, idPerson, idCustomer)
            console.log(cust)
            
            $http.post(`${consts.apiUrl}/setCustomer`, cust)
                .then(resp => {
                    //return resp.body;
                    console.log(resp)
                }).catch(function (resp) {
                    //return error;
                    console.log(resp)
                })
        }

        //const User.build =() =>

        return { registerCustomer , Customer};
    }])
})()