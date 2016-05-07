'use strict';

(() => {
    angular.module('app', ['ngRoute'])
            .config(config)
            .run(util);

    util.$inject = ['$rootScope', '$location', 'AuthenticationService'];
    config.$inject = ['$routeProvider', '$locationProvider'];

    function util($rootScope, $location, AuthenticationService) {

        $rootScope.redirect = (url) => {
            $location.path(url);
            $('.button-collapse').sideNav('hide');
        }

        // Routes that doesn't need authentication
        let no_auth_routes = ['/', '/guest-trynow'];

        // check if the current route does not need authentication (check if in the array)
        function no_need_auth(route) {
            return no_auth_routes.indexOf(route) === -1 ? false : true;
        };

        $rootScope.$on('$routeChangeStart', (event, next, current) => {
            let user;

            if (!localStorage.user) {
                AuthenticationService
                    .GetUser()
                    .then((data) => {
                        if (data.data !== false) {
                            user = data.data;                        
                        }
                    });
            }
            else {
                user = JSON.parse(localStorage.user);
            }

            // If the route requires authentication and the user is not logged in
            if (!no_need_auth($location.url()) && typeof user === 'undefined') {
                $location.path('/');
            }
        });

        // Check the backend for existing session
        function check_session() {
            AuthenticationService
                .GetUser()
                .then((data) => {
                    if (data.data === false) {
                        localStorage.clear();
                        $location.path('/');                      
                    }
                });

            console.log('called');
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
                'templateUrl'   :   'views/home.view.html',
                'resolve'       :   {

                } 
            })
            .when('/class', {
                'controller'    :   'SectionCtrl',
                'templateUrl'   :   'views/class.html',
                'resolve'       :   {

                }
            })
            .when('/edit', {
                'templateUrl'   :   'views/edit.html',
                'resolve'       :   {

                }
            })
            .when('/settings_randomize', {
                'templateUrl'   :   'views/settings_randomize.html',
                'resolve'       :   {

                }
            })
            .when('/admin', {
                'controller'    :   'AdminCtrl',
                'templateUrl'   :   'views/admin.html',
                'resolve'       :   {

                }
            })
            .when('/admin/view-pending', {
                'controller'    :   'AdminCtrl',
                'templateUrl'   :   'views/admin_approve.html',
                'resolve'       :   {

                }
            })
            .when('/admin/view-logs', {
                'controller'    :   'AdminCtrl',
                'templateUrl'   :   'views/admin_viewlogs.html',
                'resolve'       :   {

                }
            })
            .when('/admin/view-approved', {
                'controller'    :   'AdminCtrl',
                'templateUrl'   :   'views/admin_viewusers.html',
                'resolve'       :   {

                }
            })
            .when('/guest-trynow', {
                'templateUrl'   :   'views/randomize_notuser.html',
                'resolve'       :   {

                }
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
