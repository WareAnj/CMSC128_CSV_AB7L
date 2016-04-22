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
			"controller" 	: "HomeCtrl"
		})
		.when("/admin",{
			"controller" 	: "AdminCtrl"
		})
		.when("/admin_approve",{
			"controller" 	: "AdminCtrl"
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


	
		app.controller('AdminCtrl', function($scope, $location, $window, $http, $q){

		var url = "http://localhost:8000";

		$scope.Logout = function(){ 

			var deferred = $q.defer();
				
			$http.get(url + "/admin/authenticate_logout")
			.success(function(data){
				$window.location.href = '/';
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Login Faculty User");
				alert(data.context);
			});
		}

		$scope.GetUsers = function(){

			var deferred = $q.defer();
			$scope.userList = [];

			$http.get(url + "/admin/get_pending_users")
			.success(function(data){				
				var length = data[0].length;
				var i;
				for(i = 0; i < length; i++ ){
					$scope.userList.push(data[0][i]);
				}

			})
			.error(function(data) {
				alert(data.context);
			});
		};

		$scope.ApproveUser = function(id, username){
			console.log("inside approve");	
			console.log(id);

			$http.put(url + "/admin/approve_user/:" + id)
			.success(function(data){				
				alert("Successfully Approved User: " + username);
				console.log(data);
			})
			.error(function(data) {
				alert(data.context);
			});
		};


		$scope.ApproveUser = function(id, username){

			$http.put(url + "/admin/approve_user/:" + id)
			.success(function(data){				
				alert("Successfully Approved User: " + username);
				console.log(data);
			})
			.error(function(data) {
				alert(data.context);
			});
		};

		$scope.GetAllLogin = function(){

			$http.put(url + "/admin/approve_user/:")
			.success(function(data){				
				alert("Successfully Approved User: " + username);
				console.log(data);
			})
			.error(function(data) {
				alert(data.context);
			});
		};


	});



	

})();
