(function() {
  'use strict';

  angular
    .module('app')
    .controller('LectureCtrl', LectureCtrl);

  LectureCtrl.$inject = ["$scope", "$location", "$http", "LectureService"];

  function LectureCtrl($scope, $location, $http, LectureService) {
    $scope.student_info = [];
    $scope.student = [];

    $scope.Get_Class_List = function() {
      LectureService.Get_Class_List(localStorage.getItem("Course_id"), localStorage.getItem("Lecture_name"))
        .then(function(data) {
          for(let i = 0; i < data.length; i++) {
            $scope.student_info.push(data[i]);
          }
        });
    }

    $scope.Get_Selected_Student = function(student_id) {
      localStorage.setItem("Student_id", student_id)
      $('#stdInfo1').openModal();
      LectureService.Get_Student(localStorage.getItem("Student_id"))
      .then(function(data) {
        $scope.student = [];
        $scope.student.push(data[0]);
      });

    }
  }
})();
