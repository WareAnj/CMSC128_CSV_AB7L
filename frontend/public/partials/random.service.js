'use strict';

(function(){
	angular
		.module("app")
		.factory("RandomService", RandomService);

	RandomService.$inject = ["$http", "$q"];

	function RandomService($http, $q) {
		var url = "http://localhost:8000";
		var service = {};
		service.Randomize = Randomize;
		return service;

		function Randomize() {
			var deferred = $q.defer();

			$http.get(url + "/faculty_user/randomize?user_id=1&course_code=cmsc123&section_name=AB&limit=1")
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Randomize");
			});

			return deferred.promise;
		}
	}
})();
