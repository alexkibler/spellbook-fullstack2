(function () {
    'use strict';

    angular.module('spellbookClient').controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$rootScope', '$state','postFactory'];

    function HomeCtrl($rootScope, $state,postFactory) {
        /* jshint validthis:true */
        var vm = this;



        init();

        function init() {
            vm.title = "HomeCtrl";
            vm.posts = {};
        }


    }
})();



