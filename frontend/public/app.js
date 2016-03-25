(function() {
	angular
		.module("app", ["ngRoute"])
		.config(config);

	config.$inject = ["$routeProvider"];

	function config($routeProvider) {
	$routeProvider
		.when("/",{
			"controller" : "RegisterCtrl",
			"templateUrl" : "register/register.view.html"
		});
	}
})();
