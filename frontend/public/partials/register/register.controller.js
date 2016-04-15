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
    var cword = false;
    var empid = false;
    var clasfn = false;

    $scope.AddFacultyUser = function(){
    	if(!(fname && mname && lname && uname && pword && cword && empid && clasfn))
    		return;
    	RegisterService.AddFacultyUser($scope.newFacultyUser)
			.then(function(data) {
          		$scope.newFacultyUser.given_name = "";
          		$scope.newFacultyUser.middle_name = "";
          		$scope.newFacultyUser.last_name = "";
          		$scope.newFacultyUser.username = "";
				$scope.newFacultyUser.password = "";
				$scope.newFacultyUser.confirm = "";
				$scope.newFacultyUser.employee_id = "";
				//$scope.newFacultyUser.classification = '0';
  				$("#confirmpassword").attr('disabled', 'disabled');
  				$("#submit-button").attr('disabled', 'disabled');
  				$('#signupModal').closeModal();
  				$('#classificationinput').val("");
				$scope.faculty_user_data.push(data);
				Materialize.toast('Faculty User added!', 3000, 'rounded');
				fname = false;
    			mname = false;
    			lname = false;
    			uname = false;
    			pword = false;
    			cword = false;
    			empid = false;
    			clasfn = false;
			}
		);
	}

  	$scope.check_username = function(){
  		var username = document.querySelector('#nameinput').value;
  		if (username===""){
  			if($("#nameinput").hasClass('invalid')){
  				$("#nameinput").removeClass('invalid');
  			}	
  			$("#submit-button").attr('disabled', 'disabled');
          	uname = false;
          	return;
  		}
  		$http.post(
  			"faculty_user/check_faculty_user_username/",
  			{username: username}
          ).then(function(response){
            if (response.data){
  					if(!($("#nameinput").hasClass('invalid'))){
  						$("#nameinput").addClass('invalid');
  					}
  					$("#submit-button").attr('disabled', 'disabled');
          			uname = false;
          		}
          		else{
          			if($("#nameinput").hasClass('invalid')){
  						$("#nameinput").removeClass('invalid');
  					}
            		uname = true;
            		if(fname && mname && lname && uname && pword && cword && empid && clasfn)
            			$("#submit-button").removeAttr('disabled');
          		}
  			}
  		);
  	}

  	$scope.check_employee_id = function(){
  		var employee_id = document.querySelector('#employeeinput').value;
  		if (employee_id===""){
  			if($("#employeeinput").hasClass('invalid')){
  				$("#employeeinput").removeClass('invalid');
  			}
  			$("#submit-button").attr('disabled', 'disabled');
          	empid = false;
  			return;
  		}
  		$http.post(
  			"faculty_user/check_faculty_user_employee_id/",
  			{employee_id: employee_id}
  			).then(function(response){
  				if (response.data){
					if(!($("#employeeinput").hasClass('invalid'))){
						$("#employeeinput").addClass('invalid');
					}
  					empid = false;
          		}
          		else{
					if($("#employeeinput").hasClass('invalid')){
						$("#employeeinput").removeClass('invalid');
					}
            		empid = true;
            		if(fname && mname && lname && uname && pword && cword && empid && clasfn)
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
  			if(fname && mname && lname && uname && pword && cword && empid && clasfn)
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
  			if(fname && mname && lname && uname && pword && cword && empid && clasfn)
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
  			if(fname && mname && lname && uname && pword && cword && empid && clasfn)
            		$("#submit-button").removeAttr('disabled');
  		}
  	}

  	$scope.check_pword = function(){
  		var pass = document.querySelector("#passwordinput").value;
  		if (pass===""){
  			document.querySelector("#confirmpassword").value = "";
  			if($("#confirmpassword").hasClass('invalid')){
  				$("#confirmpassword").removeClass('invalid');
  			}
  			$("#submit-button").attr('disabled', 'disabled');
  			$("#confirmpassword").attr('disabled', 'disabled');
  			pword = false;
  			return;
  		}
  		else {
  			pword = true;
  			$("#confirmpassword").removeAttr('disabled');
  			if(fname && mname && lname && uname && pword && cword && empid && clasfn)
            		$("#submit-button").removeAttr('disabled');
  		}
  	}

  	$scope.check_cpword = function(){
  		var opas = document.querySelector("#passwordinput").value;
  		var cpas = document.querySelector("#confirmpassword").value;
  		if(opas===cpas){
  			if($("#confirmpassword").hasClass('invalid')){
  				$("#confirmpassword").removeClass('invalid');
  			}
  			cword = true;
  			if(fname && mname && lname && uname && pword && cword && empid && clasfn)
            		$("#submit-button").removeAttr('disabled');
  		}
  		else{
  			if(!($("#confirmpassword").hasClass('invalid'))){
  				$("#confirmpassword").addClass('invalid');
  			}
  			$("#submit-button").attr('disabled', 'disabled');
  			cword = false;
  			return;
  		}
  	}

  	$scope.check_clasfn = function(){
  		var classific = document.querySelector("#classificationinput").value;
  		if (classific===""){
  			$("#submit-button").attr('disabled', 'disabled');
  			clasfn = false;
  			return;
  		}
  		else {
  			clasfn = true;
  			if(fname && mname && lname && uname && pword && cword && empid && clasfn)
            		$("#submit-button").removeAttr('disabled');
  		}
  	}
  }

})();
