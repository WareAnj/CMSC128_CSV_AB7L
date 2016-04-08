(function(){
  'use strict';

	angular
		.module("app")
		.controller("CheckerCtrl", CheckerCtrl);

	CheckerCtrl.$inject = ["$scope", "$http"];
	function CheckerCtrl($scope, $http){
    var fname = false;
    var mname = false;
    var lname = false;
    var uname = false;
    var password = false;
    var empid = false;
    var classification = false;


    if(fname && mname && lname && uname && password && empid && classification){
      alert("dsadas");
    }

    angular.element(document.querySelector('#fname-input')).on('keyup', function(e){
      var faculty_user_given_name = document.querySelector('#fname-input').value;
      if(faculty_user_given_name===""){
        fname = false
        $("#submit-button").attr('disabled', 'disabled');
      } else if(fname && mname && lname && uname && password && empid && classification){
        $("#submit-button").removeAttr('disabled');
      } else{
        fname = true;
      }
    });

    angular.element(document.querySelector('#mname-input')).on('keyup', function(e){
      var faculty_user_given_name = document.querySelector('#mname-input').value;
      if(faculty_user_given_name===""){
        $("#submit-button").attr('disabled', 'disabled');
        mname = false;
      } else if(fname && mname && lname && uname && password && empid && classification){
        $("#submit-button").removeAttr('disabled');
      } else{
        mname = true;
      }
    });

    angular.element(document.querySelector('#lname-input')).on('keyup', function(e){
      var faculty_user_given_name = document.querySelector('#lname-input').value;
      if(faculty_user_given_name===""){
        $("#submit-button").attr('disabled', 'disabled');
        lname = false;
      } else if(fname && mname && lname && uname && password && empid && classification){
        $("#submit-button").removeAttr('disabled');
      } else{
        lname = true;
      }
    });

    angular.element(document.querySelector('#password-input')).on('keyup', function(e){
      var faculty_user_given_name = document.querySelector('#password-input').value;
      if(faculty_user_given_name===""){
        $("#submit-button").attr('disabled', 'disabled');
        password = false;
      } else if(fname && mname && lname && uname && password && empid && classification){
        $("#submit-button").removeAttr('disabled');
      } else{
        password = true;
      }
    });

    angular.element(document.querySelector('#classification-input')).on('keyup', function(e){
      var faculty_user_given_name = document.querySelector('#classification-input').value;
      if(faculty_user_given_name===""){
        $("#submit-button").attr('disabled', 'disabled');
        classification = false;
      } else if(fname && mname && lname && uname && password && empid && classification){
        $("#submit-button").removeAttr('disabled');
      } else{
        classification = true;
      }
    });

    angular.element(document.querySelector('#nameinput')).on('keyup',function(e){
			var faculty_user_username = document.querySelector('#nameinput').value;
			if (faculty_user_username===""){
				document.querySelector('#uid-warning').innerText = "";
        uname = false;
			}

			$http.post(
				"faculty_user/check_faculty_user_username/",
				 {faculty_user_username: faculty_user_username}
			).then(function successCallback(response) {
				if (response.data==true){
					document.querySelector('#uid-warning').innerText = "Username not available!";
          $("#submit-button").attr('disabled', 'disabled');
          uname = false;
        } else if(fname && mname && lname && uname && password && empid && classification){
          $("#submit-button").removeAttr('disabled');
        } else if(response.data==false){
          document.querySelector('#uid-warning').innerText = "";
          uname = true;
        }
			}, function errorCallback(response) { });
		});

		angular.element(document.querySelector('#employeeinput')).on('keyup',function(e){
			var faculty_user_employee_id = document.querySelector('#employeeinput').value;
			if (faculty_user_employee_id===""){
				document.querySelector('#uidd-warning').innerText = "";
        empid = false;
      }

			$http.post(
				"faculty_user/check_faculty_user_employee_id/",
				 {faculty_user_employee_id: faculty_user_employee_id}
			).then(function successCallback(response) {
				if (response.data==true){
					document.querySelector('#uidd-warning').innerText = "Employee ID not available!";
          $("#submit-button").attr('disabled', 'disabled');
          empid = false;
				} else if(fname && mname && lname && uname && password && empid && classification){
          $("#submit-button").removeAttr('disabled');
        } else if(response.data==false){
          document.querySelector('#uidd-warning').innerText = "";
          empid = true;
        }
			}, function errorCallback(response) { });
		});
	}

})();
