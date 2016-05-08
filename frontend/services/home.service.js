'use strict';

(function() {
	angular
		.module("app")
		.factory("HomeService", HomeService);

	HomeService.$inject = ["$http", "$q"];

	function HomeService($http, $q) {
		let service = {};
		service.Logout = Logout;
	
		return service;

		function Logout() {
			let deferred = $q.defer();

			$http.get('/authenticate/logout')
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
