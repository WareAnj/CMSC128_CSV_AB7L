'use strict';

(() => {
    angular.module('app')
            .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$rootScope', '$scope', 'HomeService'];

    function HomeCtrl($rootScope, $scope, HomeService) {

        $scope.Logout = () => {
            HomeService.Logout()
                .then(function(data){
                    $rootScope.redirect('/');
                    localStorage.clear();
                }, (error) => {
                    Materialize.toast(error.context);
                });
        }
    }
})();
