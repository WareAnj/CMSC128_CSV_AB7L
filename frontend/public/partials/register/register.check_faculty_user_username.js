(function(){
  'use strict';

  angular
    .module('app')
    .controller('CheckUserCtrl', CheckUserCtrl);

  CheckUserCtrl.$inject=["$scope", "$http"];

  function CheckUserCtrl($scope, $http){
	  angular.element(document.querySelector('#nameinput')).on('keyup',function(e){
  		var faculty_user_username = document.querySelector('#nameinput').value;
  		if (faculty_user_username === ""){
  			document.querySelector('#uid-warning').innerText = "";
  			return;
  		}

  		$http.post(
        "faculty_user/check_faculty_user_username/",
        {faculty_user_username: faculty_user_username}
      ).then(function successCallback(response) {
  			if (response.data==true){
  				document.querySelector('#uid-warning').innerText = "Username not available!";
  			} else {
  				document.querySelector('#uid-warning').innerText = "Username available!";
  			}
		  }, function errorCallback(response) {
		});
	 });
  });

})();
