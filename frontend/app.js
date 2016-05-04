'use strict';

(() => {
    angular.module('app', ['ngRoute'])
            .config(config);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                'templateUrl' :   'views/landing_page.html'
            })
            .when('/home', {
                'controller'  :   'HomeCtrl',
                'templateUrl' :   'views/home.view.html'
            })
            .otherwise({
                'redirectTo'  :   '/'
            });

        // $locationProvider.html5Mode({
        //     enabled:true,
        //     requireBase:false,
        //     rewriteLinks:false
        // });
    }
})();
