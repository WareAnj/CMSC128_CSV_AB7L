'use strict';

(() => {
    angular.module('app', ['ngRoute'])
            .config(config)
            .run(util);

    util.$inject = ['$rootScope', '$location', '$q', 'AuthenticationService'];
    config.$inject = ['$routeProvider', '$locationProvider'];

    function util($rootScope, $location, $q, AuthenticationService) {

        $rootScope.redirect = (url) => {
            $location.path(url);
            $('.button-collapse').sideNav('hide');
        }

        // Event listener every route change
        $rootScope.$on('$routeChangeStart', (event, next, current) => {
            check_session($location.url());
        });

        // Routes that doesn't need authentication
        let no_auth_routes = ['/', '/guest-trynow'];
        let routes_for_admin = ['/admin', '/admin/view-pending', '/admin/view-logs', '/admin/view-approved'];
        let routes_for_faculty_user = ['/home', '/class', '/edit', '/settings_randomize'];

        // check if the current route does not need authentication (check if in the array)
        function no_need_auth(route) {
            return no_auth_routes.indexOf(route) === -1 ? false : true;
        }

        // check if the current route needs admin authentication (check if in the array)
        function need_admin_auth(route) {
            return routes_for_admin.indexOf(route) === -1 ? false : true;
        }

        // check if the current route needs faculty user authentication (check if in the array)
        function need_faculty_user_auth(route) {
            return routes_for_faculty_user.indexOf(route) === -1 ? false : true;
        }

        // Check the backend for existing session
        function check_session(url) {
            let deferred = $q.defer();

            AuthenticationService
                .GetUser()
                .then((data) => {
                    if (data.data === false && no_need_auth(url)) {
                        $location.path(url);
                    }
                    else if (data.data === false && !no_need_auth(url)) {
                        localStorage.clear();
                        $location.path('/');
                    }
                    else if (data.data !== false) {
                        localStorage.user = data.data;
                        if (data.data.role === 'Faculty User') {
                            if (need_admin_auth(url) || url === '/') {
                                $location.path('/home');
                            }
                        }
                        else if (data.data.role === 'Administrator') {
                            if (need_faculty_user_auth(url) || url === '/') {
                                $location.path('/admin');
                            }
                        }
                    }

                    deferred.resolve(data.data);
                });

            return deferred.promise;
        }

        check_session();
    }


    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                'templateUrl'   :   'views/landing_page.html'
            })
            .when('/home', {
                'controller'    :   'CourseCtrl',
                'templateUrl'   :   'views/home.view.html'
            })
            .when('/class', {
                'controller'    :   'SectionCtrl',
                'templateUrl'   :   'views/class.html'
            })
            .when('/edit', {
                'templateUrl'   :   'views/edit.html'
            })
            .when('/settings_randomize', {
                'templateUrl'   :   'views/settings_randomize.html'
            })
            .when('/results_randomize', {
                'templateUrl'   :   'views/results_randomize.html'
            })
            .when('/admin', {
                'controller'    :   'AdminCtrl',
                'templateUrl'   :   'views/admin.html'
            })
            .when('/admin/view-pending', {
                'controller'    :   'AdminCtrl',
                'templateUrl'   :   'views/admin_approve.html'
            })
            .when('/admin/view-logs', {
                'controller'    :   'AdminCtrl',
                'templateUrl'   :   'views/admin_viewlogs.html'
            })
            .when('/admin/view-approved', {
                'controller'    :   'AdminCtrl',
                'templateUrl'   :   'views/admin_viewusers.html'
            })
            .when('/guest-trynow', {
                'templateUrl'   :   'views/randomize_notuser.html'
            })
            .otherwise({
                'templateUrl'   :   'views/error_404.html'
            });

        // $locationProvider.html5Mode({
        //     enabled:true,
        //     requireBase:false,
        //     rewriteLinks:false
        // });
    }
})();
