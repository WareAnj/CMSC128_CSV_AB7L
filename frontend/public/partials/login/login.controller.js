(function(){
  'use strict';

  angular
    .module('app')
    .controller('AuthenticationCtrl', AuthenticationCtrl);

  AuthenticationCtrl.$inject = ["$scope", "$location", "$window", "AuthenticationService"];

  function AuthenticationCtrl($scope, $location, $window, AuthenticationService){

    $scope.faculty_user_data = [];

    $scope.Login = function(){

		AuthenticationService.Login($scope.facultyUser)
			.then(function(data){
				if($scope.facultyUser.type == "user"){
					$window.location.href = '/home';
					$scope.faculty_user_data.push(data);	
				}
				if($scope.facultyUser.type == "admin"){
					$window.location.href = '/admin';
					$scope.faculty_user_data.push(data);
				}				
			});
		}
  }

})();
