(function () {
    'use strict';

    angular.module('spellbookClient').controller('SpellCtrl', SpellCtrl);

    SpellCtrl.$inject = ['spellFactory','$modal','store','toastr','$location','$rootScope'];

    function SpellCtrl(spellFactory,$modal,store,toastr,$location,$rootScope) {
        /* jshint validthis:true */
        var vm = this;
        vm.showDetail = showDetail;
        vm.saveSpell = saveSpell;


        init();

        function init() {
            vm.title = "SpellCtrl";
            $rootScope.showSpinner = 1;
            spellFactory.query(function(data){
                $rootScope.showSpinner--;
                vm.spells = data;
                var params = $location.search();
                if (params && params.id) {
                    showDetail(params.id);
                }
            });



        }

        function showDetail(id){
            $location.search({id:id});
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

        function saveSpell(spell){
            var savedSpells = store.get('spells');
            if (!savedSpells){
                savedSpells = [];
            }
            savedSpells.push(spell);
            store.set('spells',savedSpells);
            toastr.info(spell.name + ' successfully saved to your spellbook');
        }


    }
})();



