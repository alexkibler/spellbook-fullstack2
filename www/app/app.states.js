var app = angular.module('spellbookClient');

app.config(function ($stateProvider) {
    $stateProvider
        .state('home', {
            url:'/home',
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'HomeVM'
        })
        .state('spells', {
            url:'/spells',
            templateUrl: 'app/spells/spells.html',
            controller: 'SpellCtrl',
            controllerAs: 'SpellVM'
        })
        .state('spellbook', {
            url:'/spellbook',
            templateUrl: 'app/spellbook/spellbook.html',
            controller: 'SpellbookCtrl',
            controllerAs: 'SpellbookVM'
        });
});