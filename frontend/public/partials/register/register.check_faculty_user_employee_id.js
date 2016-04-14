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
    var pword = false;
    var empid = false;
    var classification = false;

  

    if(fname && mname && lname && uname && pword && empid && classification){
      alert("dsadas");
    }

    angular.element(document.querySelector('#fname-input')).on('keyup', function(e){
      var faculty_user_given_name = document.querySelector('#fname-input').value;
      if(faculty_user_given_name===""){
        fname = false;
        $("#submit-button").attr('disabled', 'disabled');
      } else{
        fname = true;
      }
      if(fname && mname && lname && uname && pword && empid && classification){
        $("#submit-button").removeAttr('disabled');
      }
    });

    angular.element(document.querySelector('#mname-input')).on('keyup', function(e){
      var faculty_user_given_name = document.querySelector('#mname-input').value;
      if(faculty_user_given_name===""){
        $("#submit-button").attr('disabled', 'disabled');
        mname = false;
      } else{
        mname = true;
      }
      if(fname && mname && lname && uname && pword && empid && classification){
        $("#submit-button").removeAttr('disabled');
      }

    });

    angular.element(document.querySelector('#lname-input')).on('keyup', function(e){
      var faculty_user_given_name = document.querySelector('#lname-input').value;
      if(faculty_user_given_name===""){
        $("#submit-button").attr('disabled', 'disabled');
        lname = false;
      } else{
        lname = true;
      }
      if(fname && mname && lname && uname && pword && empid && classification){
        $("#submit-button").removeAttr('disabled');
      }

    });

    angular.element(document.querySelector('#passwordinput')).on('keyup', function(e){
      var faculty_user_given_name = document.querySelector('#passwordinput').value;

      if(faculty_user_given_name===""){
        $("#submit-button").attr('disabled', 'disabled');
        pword = false;
      } else{
        pword = true;
      }
      if(fname && mname && lname && uname && pword && empid && classification){
        $("#submit-button").removeAttr('disabled');
      }
    });

    angular.element(document.querySelector('#classification-input')).on('keyup', function(e){
      var faculty_user_given_name = document.querySelector('#classification-input').value;
      if(faculty_user_given_name===""){
        $("#submit-button").attr('disabled', 'disabled');
        classification = false;
      } else{
        classification = true;
      }
      if(fname && mname && lname && uname && pword && empid && classification){
        $("#submit-button").removeAttr('disabled');
      }
    });

    angular.element(document.querySelector('#nameinput')).on('keyup',function(e){
			var faculty_user_username = document.querySelector('#nameinput').value;
			if (faculty_user_username===""){
        $("#submit-button").attr('disabled', 'disabled');
				document.querySelector('#uid-warning').innerText = "";
        uname = false;
			}

			$http.post("faculty_user/check_faculty_user_username/",
				 {faculty_user_username: faculty_user_username}
			).then(function successCallback(response) {
				if (response.data==true){
					document.querySelector('#uid-warning').innerText = "Username not available!";
          $("#submit-button").attr('disabled', 'disabled');
          uname = false;
        } else if(response.data==false){
          document.querySelector('#uid-warning').innerText = "";
          uname = true;
        }
			}, function errorCallback(response) { });
      if(fname && mname && lname && uname && pword && empid && classification){
        $("#submit-button").removeAttr('disabled');
      }
    });

		angular.element(document.querySelector('#employeeinput')).on('keyup',function(e){
			var faculty_user_employee_id = document.querySelector('#employeeinput').value;
      console.log($("#employeeinput").val().length);
      if (faculty_user_employee_id===""){
				document.querySelector('#uidd-warning').innerText = "";
        $("#submit-button").attr('disabled', 'disabled');
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
				} else if($("#employeeinput").val().length == 10 && response.data==false && $.isNumeric($("#employeeinput").val())){
          empid = true;
          document.querySelector('#uidd-warning').innerText = "";
          if(fname && mname && lname && uname && pword && empid && classification){
            $("#submit-button").removeAttr('disabled');
          }
        } else if($("#employeeinput").val().length < 10){
          document.querySelector('#uidd-warning').innerText = "Employee ID not valid!";
          $("#submit-button").attr('disabled', 'disabled');
          empid = false;
        }
			}, function errorCallback(response) { });
      if(fname && mname && lname && uname && pword && empid && classification){
        $("#submit-button").removeAttr('disabled');
      }
    });
	}

})();
