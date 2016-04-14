(function(){
  'use strict';

  angular
    .module('app')
    .controller('RegisterCtrl', RegisterCtrl);

  RegisterCtrl.$inject = ["$scope", "$location", "$http", "RegisterService"];

  function RegisterCtrl($scope, $location, $http, RegisterService){
    $scope.faculty_user_data = [];

    var fname = false;
    var mname = false;
    var lname = false;
    var uname = false;
    var pword = false;
    var empid = false;
    var clasfn = false;

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
          Materialize.toast('Faculty User added!', 3000, 'rounded');
				});
	  }

  	$scope.check_username = function(){
  		var faculty_user_username = document.querySelector('#nameinput').value;
  		if (faculty_user_username===""){
  			document.querySelector('#uidwarning').innerText = "";
  			$("#submit-button").attr('disabled', 'disabled');
          	uname = false;
          	return;
  		}
  		$http.post(
  			"faculty_user/check_faculty_user_username/",
  			{faculty_user_username: faculty_user_username}
  				if (response.data){
          ).then(function(response){
  					document.querySelector('#uidwarning').innerText = "Username already taken!";
  					$("#submit-button").attr('disabled', 'disabled');
          			uname = false;
          		}
          		else{
            			document.querySelector('#uidwarning').innerText = "";
            			uname = true;
            			if(fname && mname && lname && uname && pword && empid && clasfn)
            				$("#submit-button").removeAttr('disabled');
          		}
  			}
  		);
  	}

  	$scope.check_employee_id = function(){
  		var faculty_user_employee_id = document.querySelector('#employeeinput').value;
  		if (faculty_user_employee_id===""){
  			document.querySelector('#eidwarning').innerText = "";
  			$("#submit-button").attr('disabled', 'disabled');
          	empid = false;
  			return;
  		}
  		$http.post(
  			"faculty_user/check_faculty_user_employee_id/",
  			{faculty_user_employee_id: faculty_user_employee_id}
  			).then(function(response){
  				if (response.data){
  					document.querySelector('#eidwarning').innerText = "Employee ID already used!";
  					empid = false;
          		}
          		else{
            			document.querySelector('#eidwarning').innerText = "";
            			empid = true;
            			if(fname && mname && lname && uname && pword && empid && clasfn)
            				$("#submit-button").removeAttr('disabled');
          		}
  			}
  		);
  	}

  	$scope.check_fname = function(){
  		var firstName = document.querySelector("#fname-input").value;
  		if (firstName===""){
  			$("#submit-button").attr('disabled', 'disabled');
  			fname = false;
  			return;
  		}
  		else {
  			fname = true;
  			if(fname && mname && lname && uname && pword && empid && clasfn)
            		$("#submit-button").removeAttr('disabled');
  		}
  	}

  	$scope.check_mname = function(){
  		var middleName = document.querySelector("#mname-input").value;
  		if (middleName===""){
  			$("#submit-button").attr('disabled', 'disabled');
  			mname = false;
  			return;
  		}
  		else {
  			mname = true;
  			if(fname && mname && lname && uname && pword && empid && clasfn)
            		$("#submit-button").removeAttr('disabled');
  		}
  	}

  	$scope.check_lname = function(){
  		var lastName = document.querySelector("#lname-input").value;
  		if (lastName===""){
  			$("#submit-button").attr('disabled', 'disabled');
  			lname = false;
  			return;
  		}
  		else {
  			lname = true;
  			if(fname && mname && lname && uname && pword && empid && clasfn)
            		$("#submit-button").removeAttr('disabled');
  		}
  	}

  	$scope.check_pword = function(){
  		var pass = document.querySelector("#passwordinput").value;
  		if (pass===""){
  			$("#submit-button").attr('disabled', 'disabled');
  			pword = false;
  			return;
  		}
  		else {
  			pword = true;
  			if(fname && mname && lname && uname && pword && empid && clasfn)
            		$("#submit-button").removeAttr('disabled');
  		}
  	}

  	$scope.check_clasfn = function(){
  		var classific = document.querySelector("#classification-input").value;
  		if (classific===""){
  			$("#submit-button").attr('disabled', 'disabled');
  			clasfn = false;
  			return;
  		}
  		else {
  			clasfn = true;
  			if(fname && mname && lname && uname && pword && empid && clasfn)
            		$("#submit-button").removeAttr('disabled');
  		}
  	}
  }

})();
