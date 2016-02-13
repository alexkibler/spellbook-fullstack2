(function () {
    'use strict';

    angular.module('spellbookClient').controller('SpellbookCtrl', SpellbookCtrl);

    SpellbookCtrl.$inject = ['spellFactory','$modal','store','toastr'];

    function SpellbookCtrl(spellFactory,$modal,store,toastr) {
        /* jshint validthis:true */
        var vm = this;
        vm.showDetail = showDetail;
        vm.deleteSpell = deleteSpell;


        init();

        function init() {
            vm.title = "SpellbookCtrl";

            vm.spells = store.get('spells');
        }

        function showDetail(id){
            spellFactory.get({id:id}, function(data){
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
            for (var i = 0; i < vm.spells.length; i++){
                if (spell.id === vm.spells[i].id){
                    vm.spells.splice(i,1);
                }
            }
            store.set('spells',vm.spells);
            toastr.info(spell.name + ' successfully removed from your spellbook');
        }


    }
})();



