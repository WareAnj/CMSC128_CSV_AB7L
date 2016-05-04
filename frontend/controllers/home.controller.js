'use strict';

(() => {
    angular.module('app')
            .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$location', '$http', 'AuthenticationService'];

    function HomeCtrl($scope, $location, $http, AuthenticationService) {

    }
})();
