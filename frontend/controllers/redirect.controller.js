'use strict';

(() => {
    angular.module('app')
            .run('RedirectCtrl', RedirectCtrl);

    RedirectCtrl.$inject = ['$rootScope', '$location', '$window'];

    function RedirectCtrl($rootScope, $location, $window) {
        $rootScope.redirect = (url) => {
            console.log(url);
            $location.path(url);
            $('.button-collapse').sideNav('hide');
        }
    }
})();
