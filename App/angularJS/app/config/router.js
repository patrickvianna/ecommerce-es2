angular.module('myApp').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider.state('newCustomer', {
            url: "/newCustomer",
            templateUrl: 'template/customer/registerCustomer.html'
        }).state('login', {
            url: "/login",
            templateUrl: "template/login.html"
        }).state('dashboard', {
            url: "/dashboard",
            templateUrl: "template/dashboard.html"
        }).state('searchCustomer', {
            url:'/searchCustomer', 
            templateUrl: 'template/customer/searchCustomer.html'
        }).state('viewCustomer', {
            url:'/viewCustomer/:id', 
            templateUrl: 'template/customer/viewCustomer.html'
        }).state('updateCustomer', {
            url:'/updateCustomer/:id', 
            templateUrl: 'template/customer/updateCustomer.html'
        }).state('registerProduct', {
            url:'/registerProduct', 
            templateUrl: 'template/product/registerProduct.html'
        }).state('searchProduct', {
            url:'/searchProduct', 
            templateUrl: 'template/product/searchProduct.html'
        }).state('viewProduct', {
            url:'/viewProduct/:id', 
            templateUrl: 'template/product/viewProduct.html'
        }).state('updateProduct', {
            url:'/updateProduct/:id', 
            templateUrl: 'template/product/updateProduct.html'
        }).state('newFornecedor',{
            url:"/newFornecedor",
            templateUrl:'template/fornecedor/registerFornecedor.html'
        }).state('searchFornecedor',{
            url:'/searchFornecedor',
            templateUrl:'template/fornecedor/searchFornecedor.html'
        }).state('viewFornecedor',{
            url:'/viewFornecedor/:id',
            templateUrl:'template/fornecedor/viewFornecedor.html'
        }).state('updateFornecedor',{
            url:'/updateFornecedor/:id',
            templateUrl:'template/fornecedor/updateFornecedor.html'
        }).state('selling', {
            url:'/selling', 
            templateUrl: 'template/selling.html'
        }).state('buying', {
            url:'/buying', 
            templateUrl: 'template/buying.html'
        }).state('viewTransaction', {
            url:'/viewTransaction/:tipo/:id', 
            templateUrl: 'template/viewTransaction.html'
        })

        $urlRouterProvider.otherwise('/dashboard')
        //$httpProvider.interceptors.push('handleResponseError')
    }])
    .run([
      '$rootScope',
      '$http',
      '$location',
      '$window',
      'auth',
      function ($rootScope, $http, $location, $window, auth) {
        validateUser()
        $rootScope.$on('$locationChangeStart', () => validateUser())

        function validateUser() {
            const user = auth.getUser()
            const authPage = '/auth.html'
            const isAuthPage = $window.location.href.includes(authPage)

            //if(user.logado) console.log('CARALHO')

            if ((user == null) && !isAuthPage) {
                $window.location.href = authPage
            } else  if (user !=  null){

                if(isAuthPage)
                    $location.path('/dashboard')

                //isAuthPage ? $window.location.href = '/' : $location.path('/dashboard')
                /*auth.validateToken(user.token, (err, valid) => {
                if (!valid) {
                    $window.location.href = authPage
                } else {
                    user.isValid = true
                    $http.defaults.headers.common.Authorization = user.token
                    isAuthPage ? $window.location.href = '/' : $location.path('/dashboard')
                }
                })*/
            }
        }
      }
    ])