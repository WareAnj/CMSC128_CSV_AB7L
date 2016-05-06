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
            .when('/class', {
                'controller'  :   'SectionCtrl',
                'templateUrl' :   'views/class.html'
            })
            .when('/edit', {
                'templateUrl' :   'views/edit.html'
            })
            .when('/settings_randomize', {
                'templateUrl' :   'views/settings_randomize.html'
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
            .when('/guest-trynow', {
                'templateUrl' :   'views/randomize_notuser.html'
            })
            .otherwise({
                'templateUrl'  :   'views/error_404.html'
            });

        // $locationProvider.html5Mode({
        //     enabled:true,
        //     requireBase:false,
        //     rewriteLinks:false
        // });
    }
})();
