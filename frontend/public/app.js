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
		});
	}

	app.controller('RouteCtrl', function($scope) {
	  	$scope.template = {
	     "register"	: "partials/register/register.view.html",
			"login"	: "partials/login/login.view.html"
	  	}
	});
})();
