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
        localStorage.setItem("User_id", data.id);
				$scope.faculty_user_data.push(data);
			});
		}
  }

})();
