(function () {
    'use strict';

    angular.module('spellbookClient').controller('SpellCtrl', SpellCtrl);

    SpellCtrl.$inject = ['spellFactory','$modal','store','toastr'];

    function SpellCtrl(spellFactory,$modal,store,toastr) {
        /* jshint validthis:true */
        var vm = this;
        vm.showDetail = showDetail;
        vm.saveSpell = saveSpell;


        init();

        function init() {
            vm.title = "SpellCtrl";

            spellFactory.query(function(data){
                vm.spells = data;
            });



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



