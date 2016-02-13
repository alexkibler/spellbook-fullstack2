angular.module('spellbookClient')
    .factory('spellFactory',function($resource) {
        return $resource('/api/Spell/:id',{id:'@id'});
    });