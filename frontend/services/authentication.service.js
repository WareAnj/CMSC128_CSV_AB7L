'use strict';

(() => {
	angular.module('app')
			.factory('AuthenticationService', AuthenticationService);

	AuthenticationService.$inject = ['$http', '$q', '$location'];

	function AuthenticationService($http, $q, $location) {
		let service = {};
		service.LoginAsAdmin = LoginAsAdmin;
		service.LoginAsFacultyUser = LoginAsFacultyUser;
		service.GetUser = GetUser;
		return service;

		// Login as admin
		function LoginAsAdmin(admin) {
			let deferred = $q.defer();

			$http.post('/admin/authenticate_login', admin)
					.then((data) => {
						localStorage.user = JSON.stringify(data.data);
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
						localStorage.user = JSON.stringify(data.data);
						deferred.resolve(data);
					}, (error) => {
						deferred.reject(error.data);
					});

			return deferred.promise;
		}

		// Get the currently logged in user
		function GetUser() {
			let deferred = $q.defer();

			$http.get('/faculty_user/get_user')
					.then((data) => {
						deferred.resolve(data);
					}, (error) => {
						deferred.reject(error.data);
					});

			return deferred.promise;
		}
	}
})();
