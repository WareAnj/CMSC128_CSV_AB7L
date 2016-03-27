// 'use strict';

// (function(){
// 	angular
// 		.module("app")
// 		.factory("LginService", RegisterService);

// 	RegisterService.$inject = ["$http", "$q"];

// 	function RegisterService($http, $q) {
// 		var url = "http://localhost:8000";
// 		var service = {};
// 		service.AddFacultyUser = AddFacultyUser;
// 		return service;

// 		function AddFacultyUser(newFacultyUser) {
// 			var deferred = $q.defer();

// 			$http.post(url + "/faculty_user/register", newFacultyUser)
// 			.success(function(data) {
// 				deferred.resolve(data);
// 			})
// 			.error(function(data) {
// 				deferred.reject("Error: Cannot Create Faculty User");
// 			});

// 			return deferred.promise;
// 		}
// 	}
// })();
