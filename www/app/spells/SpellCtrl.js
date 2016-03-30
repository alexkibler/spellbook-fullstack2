(function () {
    'use strict';

    angular.module('spellbookClient').controller('SpellCtrl', SpellCtrl);

    SpellCtrl.$inject = ['spellFactory','spellbookFactory','$modal','store','toastr','$location','$rootScope','$http'];

    function SpellCtrl(spellFactory,spellbookFactory,$modal,store,toastr,$location,$rootScope,$http) {
        /* jshint validthis:true */
        var vm = this;
        vm.showDetail = showDetail;
        vm.saveSpell = saveSpell;
        vm.lookupSpellbookId = lookupSpellbookId;


        init();

        function init() {
            vm.title = "SpellCtrl";
            $rootScope.showSpinner = 1;
            if ($rootScope.token) {
                lookupSpellbookId();                
            }
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
            $http.put(`/api/spellbook/${vm.spellbookId}`,{spells:[spell._id]})
            .then(function(response) {                
                toastr.info(spell.name + ' successfully saved to your spellbook');
            })
            .catch(function(response) {                
                toastr.error(response);
            })
        }
        
        function lookupSpellbookId() {
            $http.get(`/api/spellbook/${$rootScope.token.username}`)
            .then(function(response) {
                if (response && response.data && response.data.info != `spellbook not found for name: ${$rootScope.token.username}`) {
                    vm.spellbookId = response.data._id;
                } else {
                    alert(`Spellbook not found for name: ${$rootScope.token.username}.  Creating one now. `);
                    $http.post('/api/spellbook',{name:$rootScope.token.username,username:$rootScope.token.username})
                        .then(function(response) {
                            if (response && response.data && response.data.id) {
                                $rootScope.spellbookId = response.data.id;
                                vm.spellbookId = response.data.id;
                            }
                        });
                }
                    
            })
            .catch(function(response) {
                
            })
        }

    }
})();



