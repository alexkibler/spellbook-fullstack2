(function() {
'use strict';

    angular
        .module('spellbookClient')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$http','$state','$rootScope','toastr'];
    function LoginController($http,$state,$rootScope,toastr) {
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
                    if (response && response.data && response.data.token) {
                        localStorage.setItem('token',JSON.stringify(response.data));
                        $rootScope.token = response.data    
                        toastr.info(`Successfully logged in as ${$rootScope.token.username}`)               
                        $state.transitionTo('home');
                    }
                    else {
                        toastr.error(response.data.message);
                    }
                })
                .catch(function(err) {
                    
                });
        }
    }
})();