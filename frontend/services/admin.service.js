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
	        			.then((data) => {
	            			deferred.resolve(data);
	            			localStorage.clear();
	            			$location.path('/');
						}, (error) => {
							deferred.reject(error.data);
							Materialize.toast(error.data, 1000);   
						});

			return deferred.promise;
		};

		function GetUsers(){
			let deferred = $q.defer();

			$http.get("admin/get_pending_users")
						.then((data) => {
	            			deferred.resolve(data);
						}, (error) => {
							deferred.reject(error.data);
							Materialize.toast(error.data, 1000);   
						});

			return deferred.promise;
		};		

		function ApproveUser(id){
			let deferred = $q.defer();

			$http.put("admin/approve_user/" + id)
						.then((data) => {
	            			deferred.resolve(data);
						}, (error) => {
							deferred.reject(error.data);
							Materialize.toast(error.data, 1000);   
						});

	        return deferred.promise;
		}


		function GetAllLogin(){
			let deferred = $q.defer();

	         $http.get("admin/login_logs")
	         			.then((data) => {
	            			deferred.resolve(data);
						}, (error) => {
							deferred.reject(error.data);
							Materialize.toast(error.data, 1000);   
						});

	         return deferred.promise;
		}


		function GetAllLogout(){
			let deferred = $q.defer();

	         $http.get("admin/logout_logs")
	        			 .then((data) => {
	            			deferred.resolve(data);
						}, (error) => {
							deferred.reject(error.data);
							Materialize.toast(error.data, 1000);   
						});

	         return deferred.promise;
		}

		function GetSpecificLogin(id){
	          let deferred = $q.defer();

	          $http.get("admin/login_logs/" + id)
          				.then((data) => {
	            			deferred.resolve(data);
						}, (error) => {
							deferred.reject(error.data);
							Materialize.toast(error.data, 1000);   
						});

	          return deferred.promise;
		}

		function GetSpecificLogout(id){
	          let deferred = $q.defer();

	          $http.get("admin/logout_logs/" + id)
			          	.then((data) => {
	            			deferred.resolve(data);
						}, (error) => {
							deferred.reject(error.data);
							Materialize.toast(error.data, 1000);   
						});

	          return deferred.promise;
		}


		function GetAllApproved(){
			  let deferred = $q.defer();

			  $http.get("admin/get_approved_users")
						.then((data) => {
	            			deferred.resolve(data);
						}, (error) => {
							deferred.reject(error.data);
							Materialize.toast(error.data, 1000);   
						});

			  return deferred.promise;
		}		 
	}
})();
