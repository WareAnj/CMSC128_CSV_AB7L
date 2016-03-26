(function() {
var app =	angular
		.module("app", ["ngRoute"])
		.config(config);

	config.$inject = ["$routeProvider"];

	function config($routeProvider) {
	$routeProvider
		.when("/",{
			"controller" : "RouteCtrl",
			"templateUrl" : "uirouter.html"
		})
		.when("/faculty_user/register",{
			"controller" : "RegisterCtrl"
		});
	}

	app.controller('RouteCtrl', function($scope) {
  $scope.template = {
    "register": "partials/register/register.view.html",
		"login": "partials/login/login.view.html"
  }
	});
})();
