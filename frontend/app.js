(function() {
  let app =   angular.module('app', ['ngRoute'])
                      .config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
      $routeProvider
          .when('/', {
              'templateUrl' :   'uirouter.html'
          })
          .when('/home', {
              'controller'  :   'HomeCtrl',
              'templateUrl' :   'views/home.html'
          })
          .otherwise({
              redirectTo    :   '/'
          });
  }


  app.controller('HomeCtrl', function($scope, $location, $window, $http, $q) {

      $scope.Logout = function() {
          let deferred = $q.defer();

          $http.get('authenticate/logout')
          .success(function(data) {
              $window.location.href = '/';
              deferred.resolve(data);
          })
          .error(function(data) {
              deferred.reject('Error: Cannot Logout Faculty User');
              alert(data.context);
          });
      }
  });

})();
