'use strict';

(function() {
	angular
		.module("app")
		.factory("CourseService", CourseService);

	CourseService.$inject = ["$http", "$q"];

	function CourseService($http, $q) {
		let service = {};
		service.Get_User = Get_User;
		// Course
		service.Get_Course = Get_Course;
		service.Add_Course = Add_Course;
		service.Edit_Course = Edit_Course;
    service.Delete_Course = Delete_Course;
		// Lecture
		service.Get_Lecture = Get_Lecture;
		service.Add_Lecture = Add_Lecture;
		service.Delete_Lecture = Delete_Lecture;
		return service;

		function Get_User() {
			let deferred = $q.defer();

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
			let deferred = $q.defer();

			$http.get("course/get_course")
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Get Classes");
			});

			return deferred.promise;
		}

		function Add_Course(newCourse) {
			let deferred = $q.defer();

			$http.post("course/post_course", newCourse)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Create Class");
			});

			return deferred.promise;
		}

		function Edit_Course(id, course) {
			let deferred = $q.defer();

			$http.put("course/put_course?id=" + id, course)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Edit Class");
			});

			return deferred.promise;
		}

    function Delete_Course(id) {
      let deferred = $q.defer();

      $http.delete("course/delete_course?id=" + id)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Error: Cannot Delete Classes");
      });

      return deferred.promise;
    }

		function Get_Lecture(course_id) {
			let deferred = $q.defer();

			$http.get("course/lecture/get_lecture?course_id=" + course_id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Get Lecture Classes");
			});

			return deferred.promise;
		}

		function Add_Lecture(course_id, section_name) {
			let deferred = $q.defer();

			$http.post("course/lecture/post_lecture?course_id=" + course_id, section_name)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Add Lecture Class");
			});

			return deferred.promise;
		}

		function Delete_Lecture(course_code, section_name) {
			let deferred = $q.defer();

			$http.delete("/section/delete_lecture_section?course_code=" + course_code + "&name=" + section_name)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Delete Lecture Class");
			});

			return deferred.promise;
		}

	}
})();
