'use strict';

(() => {
	angular.module('app')
			.factory('AuthenticationService', AuthenticationService);

	AuthenticationService.$inject = ['$http', '$q', '$location'];

	function AuthenticationService($http, $q, $location) {
		let service = {};
		service.LoginAsAdmin = LoginAsAdmin;
		service.LoginAsFacultyUser = LoginAsFacultyUser;
		return service;

		// Login as admin
		function LoginAsAdmin(admin) {
			let deferred = $q.defer();

				$http.post('http://reginyzr-uplb.rhcloud.com/' + '/admin/authenticate_login', admin)
						.then((data) => {
							deferred.resolve(data);
						}, (error) => {
							deferred.reject(error.data);
						});

			return deferred.promise;
		}

		// Login as a faculty user
		function LoginAsFacultyUser(facultyUser) {
			let deferred = $q.defer();

				$http.post('/authenticate/login', facultyUser)
						.then((data) => {
							deferred.resolve(data);
						}, (error) => {
							deferred.reject(error.data);
						});

			return deferred.promise;
		}
	}
})();
