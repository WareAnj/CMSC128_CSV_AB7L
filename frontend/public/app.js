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
		})
		.when("/admin_viewlogs",{
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

		$scope.Logout = function(){

			var deferred = $q.defer();

			$http.get("authenticate/logout")
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

		 $scope.order = function(predicate) {
		    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		    $scope.predicate = predicate;
		  };

		$scope.Logout = function(){

			var deferred = $q.defer();

			$http.get("admin/authenticate_logout")
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

			$http.get("admin/get_pending_users")
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

			$http.put("admin/approve_user/" + id)
			.success(function(data){
				alert("Successfully Approved User: " + username);
			})
			.error(function(data) {
				alert(data.context);
			});

			console.log(username);

       		/*var td = $(username).parent();
       		var tr = td.parent();
        
       		tr.css("background-color","#FF3700");
       		tr.fadeOut(400, function(){
           		tr.remove();
        	}); */

        	var index = -1;		
			var comArr = eval( $scope.userList );
			for( var i = 0; i < comArr.length; i++ ) {
				if( comArr[i].username === username ) {
					index = i;
					break;
				}
			}

			if( index === -1 ) {
				alert( "Something gone wrong" );
				return;
			}

			$scope.userList.splice( index, 1 );

		};


		$scope.GetAllLogin = function(){

			var deferred = $q.defer();
			$scope.userList = [];


			$http.get("admin/login_logs")
			.success(function(data){
				var length = data.length;
				var i;
				for(i = 0; i < length; i++ ){
					$scope.userList.push(data[i]);
				}

			})
			.error(function(data) {
				alert(data.context);
			});
		};


		$scope.GetAllLogout = function(){

			var deferred = $q.defer();
			$scope.userList = [];


			$http.get("admin/logout_logs")
			.success(function(data){
				var length = data.length;
				var i;
				for(i = 0; i < length; i++ ){
					$scope.userList.push(data[i]);
				}

			})
			.error(function(data) {
				alert(data.context);
			});
		};

		$scope.GetSpecificLogin = function(id){

			var deferred = $q.defer();
			$scope.userList = [];

			$http.get("admin/login_logs/" + id)
			.success(function(data){
				var length = data.length;
				var i;
				for(i = 0; i < length; i++ ){
					$scope.userList.push(data[i]);
				}

			})
			.error(function(data) {
				alert(data.context);
			});
		};

		$scope.GetSpecificLogout = function(id){

			var deferred = $q.defer();
			$scope.userList = [];

			$http.get("admin/logout_logs/" + id)
			.success(function(data){
				var length = data.length;
				var i;
				for(i = 0; i < length; i++ ){
					$scope.userList.push(data[i]);
				}

			})
			.error(function(data) {
				alert(data.context);
			});
		};
	});
})();
