(function(){
  'use strict';

	angular
		.module("app")
		.controller("CheckEmpIDCtrl", CheckEmpIDCtrl);

	CheckEmpIDCtrl.$inject = ["$scope", "$http"];

	function CheckEmpIDCtrl($scope, $http){
		angular.element(document.querySelector('#employee-input')).on('keyup',function(e){
			var faculty_user_employee_id = document.querySelector('#employee-input').value;
			if (faculty_user_employee_id===""){
				document.querySelector('#uid-warning').innerText = "";
				return;
			}

			$http.post(
				"faculty_user/check_faculty_user_employee_id/",
				 {faculty_user_employee_id: faculty_user_employee_id}
			).then(function successCallback(response) {
				if (response.data==true){
					document.querySelector('#uid-warning').innerText = "Employee ID not available!";
				} else {
					document.querySelector('#uid-warning').innerText = "Employee ID available!";
				}
			}, function errorCallback(response) { });
		});
	}

})();

