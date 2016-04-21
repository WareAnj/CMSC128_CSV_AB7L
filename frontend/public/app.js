(function() {
var app =	angular
		.module("app", ["ngRoute"])
		.config(config);

	config.$inject = ["$routeProvider"];

	function config($routeProvider) {
	$routeProvider
		.when("/",{
			"controller" 	: "RouteCtrl",
			"templateUrl" 	: "uirouter.html"
		})
		.when("/randomize",{
			"controller" 	: "RouteCtrl",
			"templateUrl" 	: "uirouter.html"
		})
		.when("/edit",{
			"controller" 	: "RouteCtrl",
			"templateUrl" 	: "uirouter.html"
		})
		.when("/home",{
			"controller" 	: "HomeCtrl",
		});
	}

	app.controller('RouteCtrl', function($scope) {
	  	$scope.template = {
	     "register"	: "partials/register/register.view.html",
			"login"	: "partials/login/login.view.html"
	  	}
	});

	app.controller('HomeCtrl', function($scope, $location, $window, $http, $q){

		var url = "http://localhost:8000";

		$scope.Logout = function(){ 

			var deferred = $q.defer();
				
			$http.get(url + "/authenticate/logout")
			.success(function(data){
				$window.location.href = '/';
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Login Faculty User");
				alert(data.context);
			});
		}
	});

	
  	
})();
