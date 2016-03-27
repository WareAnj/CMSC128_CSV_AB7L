
(function(){
  'use strict';

  angular
    .module('app')
    .controller('AuthenticationCtrl', AuthenticationCtrl);

  AuthenticationCtrl.$inject = ["$scope", "$location", "AuthenticationService"];

  function AuthenticationCtrl($scope, $location, AuthenticationService){
  	
  
    $scope.faculty_user_data = [];

    $scope.Login = function(){
			AuthenticationService.Login($scope.facultyUser)
				.then(function(data) {
				$scope.faculty_user_data.push(data);
				});
		}
  }

})();
