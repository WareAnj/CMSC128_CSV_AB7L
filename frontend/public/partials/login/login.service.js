'use strict';

(function(){
	angular
		.module("app")
		.factory("AuthenticationService", AuthenticationService);

	

	AuthenticationService.$inject = ['$http', '$q'];
	function AuthenticationService($http, $q){
		var url = "http://localhost:8000";

		var service = {}; 
		service.Login = Login;
		return service;

		function Login(facultyUser) {
		
				var deferred = $q.defer();
				
				$http.post(url + "/authenticate/login", facultyUser)
				.success(function(data){
					deferred.resolve(data);
				})
				.error(function(data) {
					deferred.reject("Error: Cannot Login Faculty User");
					alert(data.context);
				});
				
				return deferred.promise;
		
		} 
	}
})();