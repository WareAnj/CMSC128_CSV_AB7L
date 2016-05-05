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
                'controller'  :   'CourseCtrl',
                'templateUrl' :   'views/home.view.html'
            })
            .when('/admin', {
                'controller'  :   'AdminCtrl',
                'templateUrl' :   'views/admin.html'
            })
            .when('/admin/view-pending', {
                'controller'  :   'AdminCtrl',
                'templateUrl' :   'views/admin_approve.html'
            })
            .when('/admin/view-logs', {
                'controller'  :   'AdminCtrl',
                'templateUrl' :   'views/admin_viewlogs.html'
            })
            .when('/admin/view-approved', {
                'controller'  :   'AdminCtrl',
                'templateUrl' :   'views/admin_viewusers.html'
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
