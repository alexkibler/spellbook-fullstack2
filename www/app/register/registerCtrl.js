(function() {
'use strict';

    angular
        .module('spellbookClient')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$http','$state','toastr'];
    function RegisterController($http,$state,toastr) {
        var vm = this;
        vm.register = register;

        activate();

        

        function activate() { }
        
        function register(username, password, password2) {
            if (password === password2) {
                $http.post('/api/register', {name:username,password:password})
                    .then(function(response) {
                        if (response && response.data && response.data.success) {
                            toastr.info('Account created.  Please log in again to continue.')                        
                            $state.transitionTo('login');
                        }
                    })
            }
        }
    }
})();