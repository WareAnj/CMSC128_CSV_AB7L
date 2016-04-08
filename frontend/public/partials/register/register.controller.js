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
          $scope.newFacultyUser.faculty_user_given_name = "";
          $scope.newFacultyUser.faculty_user_middle_name = "";
          $scope.newFacultyUser.faculty_user_last_name = "";
          $scope.newFacultyUser.faculty_user_username = "";
          $scope.newFacultyUser.faculty_user_password = "";
          $scope.newFacultyUser.faculty_user_employee_id = "";
          $scope.newFacultyUser.faculty_user_classification = "";
					$scope.faculty_user_data.push(data);
				});
        Materialize.toast('Faculty User added!', 3000, 'rounded');
		}
  }

})();
