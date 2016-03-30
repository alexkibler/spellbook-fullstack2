var app = angular.module('spellbookClient');

app.config(function ($stateProvider) {
    $stateProvider
        .state('login', {
            url:'/login',
            templateUrl: 'app/login/login.html',
            controller: 'LoginController',
            controllerAs: 'LoginVM',
            data: {}
        })
        .state('register', {
            url:'/register',
            templateUrl: 'app/register/register.html',
            controller: 'RegisterController',
            controllerAs: 'RegisterVM'
        })
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