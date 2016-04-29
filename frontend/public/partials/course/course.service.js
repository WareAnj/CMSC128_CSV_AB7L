'use strict';

(function(){
	angular
		.module("app")
		.factory("CourseService", CourseService);

	CourseService.$inject = ["$http", "$q"];

	function CourseService($http, $q) {
		var service = {};
		service.Get_User = Get_User;
		service.Get_Course = Get_Course;
    service.Delete_Class = Delete_Class;
		service.Add_Class = Add_Class;
		service.Edit_Class = Edit_Class;
		service.Get_Lecture_Class = Get_Lecture_Class;
		return service;

		function Get_User() {
			var deferred = $q.defer();

			$http.get("faculty_user/get_user")
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Get User");
			});

			return deferred.promise;
		}

		function Get_Course() {
			var deferred = $q.defer();

			$http.get("course/get_course")
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Get Classes");
			});

			return deferred.promise;
		}

		function Get_Lecture_Class(course_id) {
			var deferred = $q.defer();

			$http.get("class/get_lecture_class?course_id=" + course_id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Get Lecture Class");
			});

			return deferred.promise;
		}

		function Get_Lab_Section(course_code){
			var deferred = $q.defer();

			$http.get("course/get_lab_section?course_code=" + course_code)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Get Classes");
			});

			return deferred.promise;
		}

    function Delete_Class(id) {
      var deferred = $q.defer();

      $http.delete("course/delete_course?id=" + id)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Error: Cannot Delete Classes");
      });

      return deferred.promise;
    }

		function Add_Class(newCourse) {
			var deferred = $q.defer();

			$http.post("course/post_course", newCourse)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Create Class");
			});

			return deferred.promise;
		}

		function Edit_Class(id, course) {
			var deferred = $q.defer();

			$http.put("course/put_course?id=" + id, course)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Edit Class");
			});

			return deferred.promise;
		}
	}
})();
