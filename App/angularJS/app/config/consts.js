angular.module('myApp').constant('consts', {
    appName: 'Ecommerce - ES2',
    version: '1.0',
    owner: 'Patrick',
    year: '2018',
    site: '',
    apiUrl: 'https://ecommerce-es2.appspot.com/api',
    oapiUrl: 'https://ecommerce-es2.appspot.com/oapi',
    userKey: '_my_app_user'
}).run(['$rootScope', 'consts', function ($rootScope, consts) {
    $rootScope.consts = consts
}])