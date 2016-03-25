(function(){
  'use strict';

  angular
    .module('app')
    .controller('RegisterCtrl', RegisterCtrl);

  RegisterCtrl.$inject = ["$scope", "RegisterService"];

  function RegisterCtrl($scope, RegisterService){
    $scope.faculty_user_data = [];

    $scope.AddFacultyUser = function(){
			RegisterService.AddFacultyUser($scope.newFacultyUser)
				.then(function(data) {
					// $scope.newDegreeProgram.code = "";
					// $scope.newDegreeProgram.name = "";
					$scope.faculty_user_data.push(data);
				});
		}
  }

})();
