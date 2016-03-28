angular.module('spellbookClient')
    .factory('spellbookFactory',function($resource) {
        return $resource('/api/Spellbook/:name',{name:'@name'});
    });