'use strict';

(function() {
	angular
		.module("app")
		.factory("RandomService", RandomService);

	RandomService.$inject = ["$http", "$q"];

	function RandomService($http, $q) {
		var service = {};
		service.Randomize = Randomize;
		return service;

		function Randomize(counts) {
			console.log(counts);

			/*
				user_id:                req.body.user_id,
		        course_code:            req.body.course_code,
		        section_name:           req.body.section_name,
		        section_code:           req.body.section_code,
		        limit: 
			*/


			var deferred = $q.defer();
			var randdata = {
				"user_id":"1", 
				"course_code":"CMSC 128", 
				"section_name":"AB",
				"section_code":"1L",
				"limit":counts.onel
			};
			/*
			randdata.user_id = 1;
			randdata.course_code = "CMSC 128";
			randdata.section_name = "AB";
			randdata.section_code = "1L";
			randdata.limit = counts.onel;
			*/
			console.log(randdata);

			$http.post("/faculty_user/randomize", randdata)
			.success(function(data) {
				deferred.resolve(data);
				console.log(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Randomize");
			});

			return deferred.promise;
		}
	}
})();
