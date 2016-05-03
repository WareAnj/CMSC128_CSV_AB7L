(function() {
  let app =   angular.module("app", ["ngRoute"])
                      .config(config);

  config.$inject = ["$routeProvider"];

  function config($routeProvider) {
      $routeProvider
          .when("/", {
              "controller" 	: "RouteCtrl",
              "templateUrl" 	: "uirouter.html"
          })
          .when("/randomize", {
              "controller" 	: "RouteCtrl",
              "templateUrl" 	: "uirouter.html"
          })
          .when("/edit", {
              "controller" 	: "RouteCtrl",
              "templateUrl" 	: "uirouter.html"
          })
          .when("/home", {
              "controller" 	: "HomeCtrl"
          });
  }


  // RouteCtrl
  app.controller('RouteCtrl', function($scope) {
      $scope.template = {
          "register"	: "partials/register/register.view.html",
          "login"	    : "partials/login/login.view.html"
      }
  });


  app.controller('HomeCtrl', function($scope, $location, $window, $http, $q) {

      $scope.Logout = function() {
          let deferred = $q.defer();

          $http.get("authenticate/logout")
          .success(function(data) {
              $window.location.href = '/';
              localStorage.clear();
              deferred.resolve(data);
          })
          .error(function(data) {
              deferred.reject("Error: Cannot Logout Faculty User");
              alert(data.context);
          });
      }
  });

})();
