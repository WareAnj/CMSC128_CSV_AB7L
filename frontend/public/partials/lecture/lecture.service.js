'use strict';

(function() {
	angular
		.module("app")
		.factory("LectureService", LectureService);

	LectureService.$inject = ["$http", "$q"];

	function LectureService($http, $q) {
		let service = {};
		service.Get_Class_List = Get_Class_List;
		return service;

		function Get_Class_List(course_id, name) {
			let deferred = $q.defer();

			$http.get("course/lecture/get_class_list?course_id=" + course_id + "&name=" + name)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Get Lecture Class List");
			});

			return deferred.promise;
		}
	}
})();
