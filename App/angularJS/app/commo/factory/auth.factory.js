(function () {

    angular.module('myApp').factory('auth', ['$http', 'consts', AuthFactory])

    function AuthFactory($http, consts) {
       
        let user = null

        function getUser() {
            if(!user) {
                user = localStorage.getItem(consts.userKey)
            }
            return user
        }

        function signup(user, callback) {
            submit('signup', user, callback)
        }

        function login(user, callback) {
            submit('login', user, callback)
        }

        
        function submit(url, user, callback) {
            $http.post(`${consts.oapiUrl}/${url}`, user)
                .then(resp => {

                    localStorage.setItem(consts.userKey, JSON.stringify(resp.data))
                    $http.defaults.headers.common.Authorization = resp.data.id
                    console.log(resp)
                    if(callback) {
                        callback(null, resp.data)
                     }
                }).catch(function (resp) {
                    if (callback) {
                        console.log(resp)
                        callback(resp, null)  
                     }
                })
        }

        function logout(callback) {
            user = null

            console.log('LOGOUT')
            console.log(getUser())
            localStorage.removeItem(consts.userKey)   
            console.log(getUser())

            $http.defaults.headers.common.Authorization = ''
            if (callback) callback(null)
        }

        function validateToken(token, callback) {
            if (token) {
                $http.post(`${consts.oapiUrl}/validateToken`, { token })
                    .then(resp => {
                        if (!resp.data.valid) {
                            logout()
                        } else {
                            $http.defaults.headers.common.Authorization = getUser().token
                        }
                        if (callback) callback(null, resp.data.valid)
                    }).catch(function (resp) {
                        if (callback) callback(resp.data.errors)
                    })
            } else {
                if (callback) callback('Token inválido.')
            }
        }
        
        return { signup, login, logout, getUser, validateToken }
    }

})()