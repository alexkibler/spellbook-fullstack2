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
            
            getSpellbook();
        }

        function showDetail(id){
            
            $rootScope.showSpinner++;
            spellFactory.get({id:id}, function(data){
                
            $rootScope.showSpinner--;
                vm.spellDetail = data;
                $modal.open({
                    animation:true,
                    templateUrl:'app/layout/modal.html',
                    controller:'ModalInstanceCtrl as ModalVM',
                    size:'lg',
                    resolve:{
                        items:function(){
                            return vm.spellDetail;
                        }
                    }

                });
            });
        }

        function deleteSpell(spell){
            
            $rootScope.showSpinner++;
            $http({
                    method:'delete',
                    url:`/api/spellbook/${$rootScope.spellbookId}/${spell}`, 
                    headers: {'x-access-token':$rootScope.token.token}
                })
                .then(function(response) {
                    
            $rootScope.showSpinner--;
                    vm.spells = [];
                    getSpellbook();   
                });
        }

        function getSpellbook() {
            var spells;
            
            $rootScope.showSpinner++;
            $http.get(`/api/spellbook/${$rootScope.token.username}`,{isArray:true})
            .success(function(data){
                $rootScope.showSpinner--;
                $rootScope.spellbookId = data._id;
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



