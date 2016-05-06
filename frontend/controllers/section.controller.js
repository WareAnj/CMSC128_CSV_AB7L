(function() {
  'use strict';

  angular
    .module('app')
    .controller('SectionCtrl', SectionCtrl);

  SectionCtrl.$inject = ["$scope", "$location", "$http", "SectionService", "$route"];

  function SectionCtrl($scope, $location, $http, SectionService, $route) {
    $scope.section_info = [];
    $scope.lab_sections_info = [];
    $scope.student_info = [];
    $scope.student = [];
    $scope.student_per_lab = [];

    $scope.Get_Lab_Sections = function() {
       SectionService.Get_Lab_Sections(localStorage.getItem("course_id"), localStorage.getItem("section_name"))
         .then(function(data) {
          $scope.lab_sections_info = [];
           for(var i = 0 ; i < data.length; i++){
             $scope.lab_sections_info.push({
               'course_code' : localStorage.getItem('course_code'),
               'section_name' :  localStorage.getItem("section_name"),
               'section_code':  data[i].code
             });
           }
           console.log($scope.lab_sections_info);
        });
     }

     $scope.Get_Student_Per_Lab_Section = function(section_code) {
        console.log(section_code);
        
        localStorage.setItem("section_code", section_code)
       SectionService.Get_Student_Per_Lab_Section(localStorage.getItem("course_code"), localStorage.getItem("section_name"), localStorage.getItem("section_code"))
         .then(function(data) {
          $scope.student_per_lab = [];
           for(var i = 0 ; i < data.length; i++){
             $scope.student_per_lab.push(data[i]);
           }
           console.log($scope.student_per_lab);
        });
     }

    $scope.Get_Class_List = function() {
      SectionService.Get_Class_List(localStorage.getItem("course_id"), localStorage.getItem("section_name"))
        .then(function(data) {
          for(let i = 0; i < data.length; i++) {
            $scope.student_info.push(data[i]);
          }
        });

      $scope.section_info = [];
      $scope.section_info.push({
        'course_code': localStorage.getItem("course_code"),
        'section_name': localStorage.getItem("section_name"),
        'course_title': localStorage.getItem("course_title"),
        'course_description': localStorage.getItem("course_description")
      });
    }

    $scope.Get_Selected_Student = function(student_id) {
      localStorage.setItem("student_id", student_id)
      $('#stdInfo1').openModal();
      SectionService.Get_Student(localStorage.getItem("student_id"))
      .then(function(data) {
        $scope.student = [];
        $scope.student.push(data[0]);
      });

    }
  }
})();
