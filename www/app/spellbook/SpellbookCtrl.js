(function () {
    'use strict';

    angular.module('spellbookClient').controller('SpellbookCtrl', SpellbookCtrl);

    SpellbookCtrl.$inject = ['spellFactory','spellbookFactory','$modal','toastr','$rootScope','$http'];

    function SpellbookCtrl(spellFactory,spellbookFactory,$modal,toastr,$rootScope,$http) {
        /* jshint validthis:true */
        var vm = this;
        vm.showDetail = showDetail;
        vm.deleteSpell = deleteSpell;
        vm.getSpellbook = getSpellbook;
        vm.spells = [];

        init();

        function init() {
            vm.title = "SpellbookCtrl";
            
            
        }

        function showDetail(id){
            
        }

        function deleteSpell(spell){
        }

        function getSpellbook() {
            var spells;
            $http.get(`/api/spellbook/${vm.username}`,{isArray:true})
            .success(function(data){
                $rootScope.showSpinner--;
                spells = data.spells;
                angular.forEach(spells,function(value,key) {
                    spellFactory.get({id:value},function(data) {
                        vm.spells.push(data);
                    })
                })
            });
            
        }

    }
})();



