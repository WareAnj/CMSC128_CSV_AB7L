'use strict';

(function() {
	angular
		.module("app")
		.factory("SectionService", SectionService);

	SectionService.$inject = ["$http", "$q"];

	function SectionService($http, $q) {
		let service = {};
		service.Get_Class_List = Get_Class_List;
		service.Get_Student = Get_Student;
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

		function Get_Student(id) {
			let deferred = $q.defer();

			$http.get("course/lecture/get_student?id=" + id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Get Student");
			});

			return deferred.promise;
		}
	}
})();
