'use strict';

(function() {
	angular
		.module("app")
		.factory("AdminService", AdminService);

	AdminService.$inject = ["$http", "$q",  "$location", "$window"];

	function AdminService($http, $q, $location, $window) {
		let service = {};
		service.Logout = Logout;
		service.GetUsers = GetUsers;
		service.ApproveUser = ApproveUser;
		service.GetAllLogin = GetAllLogin;
		service.GetAllLogout = GetAllLogout;
		service.GetSpecificLogin = GetSpecificLogin;
		service.GetSpecificLogout = GetSpecificLogout;
		service.GetAllApproved = GetAllApproved;
	
		return service;

		function Logout() {
			let deferred = $q.defer();

	        $http.get("admin/authenticate_logout")
	        .success(function(data) {
	            $window.location.href = '/';
	            deferred.resolve(data);
	        })
	        .error(function(data) {
	            deferred.reject("Error: Cannot Login Faculty User");
	            alert(data.context);
	        });

			return deferred.promise;
		};

		function GetUsers(){
			let deferred = $q.defer();

			$http.get("admin/get_pending_users")
			.success(function(data) {
	            deferred.resolve(data);
	        })
	        .error(function(data) {
	            deferred.reject("Error: Cannot Get Pending Users");
	            alert(data.context);
	        });

			return deferred.promise;
		};		

		function ApproveUser(id){
			let deferred = $q.defer();

			$http.put("admin/approve_user/" + id)
	        .success(function(data) {
	           	deferred.resolve(data);
	        })
	        .error(function(data) {
	        	deferred.reject("Error: Cannot Approve User");
	            alert(data.context);
	        });

	        return deferred.promise;
		}


		function GetAllLogin(){
			let deferred = $q.defer();

	         $http.get("admin/login_logs")
	         .success(function(data) {
	            deferred.resolve(data);
	         })
	         .error(function(data) {
	         	  deferred.reject("Error: Cannot Get All Logins");
	              alert(data.context);
	         });

	         return deferred.promise;
		}


		function GetAllLogout(){
			let deferred = $q.defer();

	         $http.get("admin/logout_logs")
	         .success(function(data) {
	            deferred.resolve(data);
	         })
	         .error(function(data) {
	         	  deferred.reject("Error: Cannot Get All Logouts");
	              alert(data.context);
	         });

	         return deferred.promise;
		}

		function GetSpecificLogin(id){
	          let deferred = $q.defer();

	          $http.get("admin/login_logs/" + id)
	          .success(function(data) {
	             deferred.resolve(data);
	          })
	          .error(function(data) {
	              deferred.reject("Error: Cannot Get Logins Of Specified User");
	              alert(data.context);
	          });

	          return deferred.promise;
		}

		function GetSpecificLogout(id){
	          let deferred = $q.defer();

	          $http.get("admin/logout_logs/" + id)
	          .success(function(data) {
	             deferred.resolve(data);
	          })
	          .error(function(data) {
	              deferred.reject("Error: Cannot Get Logouts Of Specified User");
	              alert(data.context);
	          });

	          return deferred.promise;
		}


		function GetAllApproved(){
			  let deferred = $q.defer();

			  $http.get("admin/get_approved_users")
			  .success(function(data){
			  	deferred.resolve(data)
			  })
			  .error(function(data){
			  	deferred.reject("Error: Cannot Get All Approved Users");
			  	alert(data.context);
			  })

			  return deferred.promise;
		}


		 
	}
})();
