(function() {
'use strict';

    angular
        .module('spellbookClient')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$http','$state','$rootScope'];
    function LoginController($http,$state,$rootScope) {
        var vm = this;
        vm.login = login;

        activate();

        ////////////////

        function activate() { 
            if ($rootScope.token)
                $state.transitionTo('home');
        }
        
        function login(username, password) {
            $http.post('/api/login', {name:username,password:password})
                .then(function(response) {
                    if (response && response.data && response.data.message!="Authentication failed. Wrong password.") {
                        localStorage.setItem('token',JSON.stringify(response.data));
                        $rootScope.token = response.data                   
                        $state.transitionTo('home');
                    }
                    if (response && response.data && response.data.message=="Authentication failed. Wrong password.") {
                        alert('Wrong password!');
                    }
                })
                .catch(function(err) {
                    
                });
        }
    }
})();