'use strict';

(function(){
	angular
		.module("app")
		.factory("CourseService", CourseService);

	CourseService.$inject = ["$http", "$q"];

	function CourseService($http, $q) {
		var url = "http://localhost:8000";
		var service = {};
		service.Get_User_Id = Get_User_Id;
    service.Get_Classes = Get_Classes;
    service.Delete_Class = Delete_Class;
		service.Add_Class = Add_Class;
    return service;

		function Get_User_Id() {
			var deferred = $q.defer();

			$http.get(url + "/faculty_user/get_user_id")
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Get User ID");
			});

			return deferred.promise;
		}

    function Get_Classes(user_id) {
			var deferred = $q.defer();

			$http.get(url + "/course/get_course?user_id=" + user_id)
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

      $http.delete(url + "/course/delete_course?user_id=" + user_id + "&id=" + id)
      .success(function(data) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Error: Cannot Delete Classes");
      });

      return deferred.promise;
    }

		function Add_Class(newCourse, user_id) {

			var deferred = $q.defer();

			$http.post(url + "/course/post_course?user_id=" + user_id, newCourse)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Create Class");
			});

			return deferred.promise;
		}
	}
})();
