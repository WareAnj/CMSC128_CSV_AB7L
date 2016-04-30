(function() {
  'use strict';

  angular
    .module('app')
    .controller('LectureCtrl', LectureCtrl);

  LectureCtrl.$inject = ["$scope", "$location", "$http", "LectureService"];

  function LectureCtrl($scope, $location, $http, LectureService) {
    $scope.student_info = [];

    $scope.Get_Class_List = function() {
      LectureService.Get_Class_List(localStorage.getItem("Course_id"), localStorage.getItem("Lecture_name"))
        .then(function(data) {
          for(let i = 0; i < data.length; i++) {
            $scope.student_info.push(data[i]);
          }
        });
    }
  }
})();
