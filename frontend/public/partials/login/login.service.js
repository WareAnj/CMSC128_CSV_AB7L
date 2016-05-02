'use strict';

(function() {
	angular
		.module("app")
		.factory("AuthenticationService", AuthenticationService);

	AuthenticationService.$inject = ['$http', '$q', '$location', '$window'];

	function AuthenticationService($http, $q, $location, $window) {
		let service = {};
		service.Login = Login;
		return service;

		function Login(facultyUser) {

				let deferred = $q.defer();

				$http.post("admin/authenticate_login", facultyUser)
				.success(function(data) {
					$window.location.href = '/admin';
					deferred.resolve(data);
				})				
				.error(function(data) {
					if(data.context == "Invalid password"){
						deferred.reject("Error: Cannot Login Faculty User");
						alert(data.context);
						return deferred.promise;
					}


					$http.post("authenticate/login", facultyUser)
					.success(function(data) {
						$window.location.href = '/home';
						deferred.resolve(data);
					})					
					.error(function(data) {
						deferred.reject("Error: Cannot Login Faculty User");
						alert(data.context);
					});
				});

				return deferred.promise;
		}
	}
})();
