'use strict';

(() => {
    angular.module('app')
            .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$rootScope', '$scope', '$location', '$http', '$q'];

    function HomeCtrl($rootScope, $scope, $location, $http, $q) {
        $scope.Logout = () => {
            let deferred = $q.defer();

            $http.get('/authenticate/logout')
                .then((data) => {
                    $rootScope.redirect('/');
                    localStorage.clear();
                    deferred.resolve(data);
                }, (error) => {
                    deferred.reject('Error: Cannot Logout Faculty User');
                    Materialize.toast(error.context);
                });
        }
    }
})();
