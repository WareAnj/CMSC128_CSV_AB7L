'use strict';

(() => {
    angular.module('app')
            .controller('AuthenticationCtrl', AuthenticationCtrl);

    AuthenticationCtrl.$inject = ['$scope', '$location', '$window', 'AuthenticationService'];

    function AuthenticationCtrl($scope, $location, $window, AuthenticationService) {
        $scope.faculty_user_data = [];

        $scope.Login = () => {
            AuthenticationService
                .LoginAsAdmin($scope.facultyUser)
                .then((data) => {
                    $scope.faculty_user_data.push(data);
                    $location.url('/admin');
                }, (error) => {
                    if (error.context === 'Invalid username' || error.context === 'Invalid password') {
                        AuthenticationService
                            .LoginAsFacultyUser($scope.facultyUser)
                            .then((data) => {
                                $location.url('/home');
                            }, (error) => {
                                Materialize.toast(error.context);
                            });
                    }
                });
		}
    }
})();
