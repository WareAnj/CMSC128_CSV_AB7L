(function(){
  'use strict';

  angular
    .module('app')
    .controller('RegisterCtrl', RegisterCtrl);

  RegisterCtrl.$inject = ["$scope", "$location", "RegisterService"];

  function RegisterCtrl($scope, $location, RegisterService){
    $scope.faculty_user_data = [];

    $scope.AddFacultyUser = function(){
      $scope.newFacultyUser.faculty_user_username;

      RegisterService.AddFacultyUser($scope.newFacultyUser)
				.then(function(data) {
					$scope.faculty_user_data.push(data);
				});
        Materialize.toast('Faculty User added!', 3000, 'rounded');
		}
  }

})();
