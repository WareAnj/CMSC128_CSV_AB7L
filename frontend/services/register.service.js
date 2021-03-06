'use strict';

(function() {
	angular
		.module("app")
		.factory("RegisterService", RegisterService);

	RegisterService.$inject = ["$http", "$q"];

	function RegisterService($http, $q) {
		let service = {};
		service.AddFacultyUser = AddFacultyUser;
		return service;

		function AddFacultyUser(newFacultyUser) {

			let deferred = $q.defer();

			$http.post("faculty_user/register", newFacultyUser)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Create Faculty User");
			});

			return deferred.promise;
		}
	}
})();
