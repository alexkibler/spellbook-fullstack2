(function () {
    'use strict';

    angular.module('spellbookClient').controller('ShellCtrl', ShellCtrl);

    ShellCtrl.$inject = ['$rootScope', '$state'];

    function ShellCtrl($rootScope, $state) {
        /* jshint validthis:true */
        var vm = this;
        vm.navigate = navigate;



        init();

        function init() {
            vm.title = "ShellCtrl";


            vm.showSpinner = false;
            vm.spinnerMessage = 'Retrieving data...';

            vm.spinnerOptions = {
                radius: 40,
                lines: 8,
                length: 0,
                width: 30,
                speed: 1.7,
                corners: 1.0,
                trail: 100,
                color: '#428bca'
            };

            $rootScope.$on('spinner.toggle', function (event, args) {
                vm.showSpinner = args.show;
                vm.spinnerMessage = args.message;
                if (args.message) {
                    vm.spinnerMessage = args.message;
                }
            });
        }

        function navigate(state){
            $state.transitionTo(state);
        }

    }
})();



