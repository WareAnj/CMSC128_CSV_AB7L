(function() {
  'use strict';

  angular
    .module('app')
    .controller('RandomCtrl', RandomCtrl);

  RandomCtrl.$inject = ["$scope", "$location", "RandomService"];

  function RandomCtrl($scope, $location, RandomService) {
    $scope.students = [];

    $scope.Randomize = function() {
      
      if($scope.counts == null){
        alert("Please Pick Values");
        return;
      }

      RandomService.Randomize($scope.counts)
      .then(function(data) {
        
      });
    }
  }
})();
