(function () {
    'use strict';
    var app = angular.module('spellbookClient', [
        // Angular modules
        'ngResource',
        'ngAnimate',
        'angular-storage',
        // Third party modules
        'ui.router',
        'ui.bootstrap',
        'toastr'

    ]);

    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider,toastrConfig) {


//form_entry.w2.needs-more-info

        angular.extend(toastrConfig, {
            allowHtml: true,
            autoDismiss: false,
            closeButton: false,
            closeHtml: '<button>x</button>',
            containerId: 'toast-container',
            extendedTimeOut: 1000,
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            },
            maxOpened: 0,
            messageClass: 'toast-message',
            newestOnTop: true,
            onHidden: null,
            onShown: null,
            onTap: null,
            positionClass: 'toast-top-left',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            progressBar: false,
            tapToDismiss: true,
            target: 'body',
            templates: {
                toast: 'directives/toast/toast.html',
                progressbar: 'directives/progressbar/progressbar.html'
            },
            timeOut: 5000,
            titleClass: 'toast-title',
            toastClass: 'toast'
        });
    });


    app.run(['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            //keeping this commented out for now because I don't need it yet,
            //but this is for when a state change starts
            $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState) {
                    $rootScope.previousState = fromState.name;
                    $rootScope.currentState = toState.name;
                });
        }

    ]);

    app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
    app.filter('unsafe', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    });



})();