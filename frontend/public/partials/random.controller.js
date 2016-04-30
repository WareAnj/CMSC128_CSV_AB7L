(function() {
  'use strict';

  angular
    .module('app')
    .controller('RandomCtrl', RandomCtrl);

  RandomCtrl.$inject = ["$scope", "$location", "RandomService"];

  function RandomCtrl($scope, $location, RandomService) {

    $scope.Randomize = function() {
      RandomService.Randomize()
				.then(function(data) {
          var string = data[0].student_given_name + " " + data[0].student_middle_name + " " + data[0].student_last_name;
          document.querySelector('#lettersContainer').innerText = string;
				});
		}
  }
})();
