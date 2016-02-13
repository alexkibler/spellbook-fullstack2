angular.module('spellbookClient')
    .factory('postFactory',function($resource) {
        return $resource('/api/post/:id',{id:'@id'});
    });