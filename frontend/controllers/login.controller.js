'use strict';

(() => {
    angular.module('app')
            .controller('AuthenticationCtrl', AuthenticationCtrl);

    AuthenticationCtrl.$inject = ['$scope', '$location', '$window', 'AuthenticationService'];

    function AuthenticationCtrl($scope, $location, $window, AuthenticationService) {
        $scope.faculty_user_data = [];

        $scope.Login = () => {
            AuthenticationService
                .Login($scope.facultyUser)
                .then((data) => {
                    $scope.faculty_user_data.push(data);
                    console.log(data.data);
                    $location.url('home');
                });
		}
    }
})();
