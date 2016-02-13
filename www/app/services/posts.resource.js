angular.module('spellbookClient')
    .factory('postFactory',function($resource) {
        return $resource('http://spells.alexkibler.com/api/post/:id',{id:'@id'});
    });