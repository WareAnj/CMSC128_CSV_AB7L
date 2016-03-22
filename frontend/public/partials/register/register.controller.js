
(function(){
  'use strict';

  angular
    .module('app')
    .controller('RegisterCtrl', RegisterCtrl);

  RegisterCtrl.$inject = ["$scope", "$location", "RegisterService"];

  function RegisterCtrl($scope, $location, RegisterService){
    $scope.faculty_user_data = [];

    $scope.AddFacultyUser = function(){
			RegisterService.AddFacultyUser($scope.newFacultyUser)
				.then(function(data) {
					$scope.faculty_user_data.push(data);
				});
		}
  }

})();
