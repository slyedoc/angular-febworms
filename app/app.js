var app = angular.module('app', [ 'febworms', 'ngRoute', 'ngResource', 'ui.router' ]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/');

    // setup the states
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home/home.html'
        })
        // ********** Group State **********
        .state('forms', {
            url: '/forms',
            abstract: true,
            template: '<div ui-view></div>'
        })
        .state('forms.index', {
            url: '',
            templateUrl: 'form/index.html',
            controller: 'FormIndexController'
        })
        .state('forms.edit', {
            url: 'edit',
            templateUrl: 'form/edit.html',
            controller: 'FormEditController'
        });

});

