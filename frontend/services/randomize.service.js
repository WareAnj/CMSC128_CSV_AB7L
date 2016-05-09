'use strict';

(function() {
	angular
		.module("app")
		.factory("RandomService", RandomService);

	RandomService.$inject = ["$http", "$q"];

	function RandomService($http, $q) {
		var service = {};
		service.GetLabs = GetLabs;
		service.GetLimits = GetLimits;
		service.Randomize = Randomize;
		return service;

		function GetLabs(name, course_id){
			var deferred = $q.defer();

			$http.get("/course/lecture/get_lab_sections?name=" + name + "&course_id=" + course_id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot GetLabs");
			});

			return deferred.promise;
		}

		function GetLimits(name, lab_section, j){
			var deferred = $q.defer();

			$http.get("/course/lecture/get_lab_limits?name=" + name + "&lab_section=" + lab_section)
			.success(function(data) {
				data.count = data[0].count;
				data.j = j;
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot GetLimits");
			});

			return deferred.promise;
		}		

		function Randomize(randdata) {

			var deferred = $q.defer();

			$http.post("/faculty_user/randomize", randdata)
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
