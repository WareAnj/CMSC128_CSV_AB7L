'use strict';

(function(){
	angular
		.module("app")
		.factory("CourseService", CourseService);

	CourseService.$inject = ["$http", "$q"];

	function CourseService($http, $q) {
		var service = {};
		service.Get_User_Id = Get_User_Id;
        service.Get_Classes = Get_Classes;
        service.Delete_Class = Delete_Class;
		service.Add_Class = Add_Class;
		service.Edit_Class = Edit_Class;
		service.Get_Lecture_Class = Get_Lecture_Class;
		return service;

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

		function Get_User_Id(user_id) {
			var deferred = $q.defer();

			$http.get("faculty_user/get_user_id?user_id=" + user_id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Get User ID");
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

    function Get_Classes(user_id) {
			var deferred = $q.defer();

			$http.get("course/get_course?user_id=" + user_id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Get Classes");
			});

			return deferred.promise;
		}

    function Delete_Class(user_id, id) {
      var deferred = $q.defer();

      $http.delete("course/delete_course?user_id=" + user_id + "&id=" + id)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Error: Cannot Delete Classes");
      });

      return deferred.promise;
    }

		function Add_Class(user_id, newCourse) {
			var deferred = $q.defer();

			$http.post("course/post_course?user_id=" + user_id, newCourse)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Create Class");
			});

			return deferred.promise;
		}

		function Edit_Class(user_id, id, course) {
			var deferred = $q.defer();

			$http.put("course/put_course?user_id=" + user_id + "&id=" + id, course)
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
