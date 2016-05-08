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
    $scope.to_edit_student = [];
    $scope.newStudent = [];
    let student_id;
    let old_student_given_name;
    let old_student_middle_name;
    let old_student_last_name;
    let old_student_degree;
    let old_student_classification;
    let old_student_college;
    let gname = false;
    let mname = false;
    let lname = false;
    let classification = false;
    let degree = false;
    let college = false;

    $scope.Get_Lab_Sections = function() {
       SectionService.Get_Lab_Sections(localStorage.getItem("course_id"), localStorage.getItem("section_name"))
         .then(function(data) {
          $scope.lab_sections_info = [];
           for(var i = 0 ; i < data.length; i++){
             if(data[i].code != null){
               $scope.lab_sections_info.push({
                 'course_code': localStorage.getItem('course_code'),
                 'section_name': localStorage.getItem("section_name"),
                 'section_code': data[i].code
               });
            }
           }
        });
     }

     $scope.Get_Student_Per_Lab_Section = function(section_code) {
       localStorage.setItem("section_code", section_code)
       SectionService.Get_Student_Per_Lab_Section(localStorage.getItem("course_code"), localStorage.getItem("section_name"), localStorage.getItem("section_code"))
         .then(function(data) {
          $scope.student_per_lab = [];
           for(var i = 0 ; i < data.length; i++){
             $scope.student_per_lab.push(data[i]);
           }
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

    $scope.Delete_Selected_Student = function() {
      SectionService.Delete_Student(student_id)
      .then(function(data){

      });

      SectionService.Get_Student_Per_Lab_Section(localStorage.getItem("course_code"), localStorage.getItem("section_name"), localStorage.getItem("section_code"))
        .then(function(data) {
         $scope.student_per_lab = [];
          for(var i = 0 ; i < data.length; i++){
            $scope.student_per_lab.push(data[i]);
          }
       });
    }

    $scope.Get_Student_Id = function(s_id, type){
      student_id = s_id;
      if(type == "delete"){
        $("#delete-modal").openModal();
      }
      if(type == "edit"){
        $("#edit-modal").openModal({
          complete: function(){
            $(".past-data").html("");
          }
        });

        SectionService.Get_Student(student_id)
        .then(function(data) {
          $scope.to_edit_student.push({
            'given_name' : data[0].given_name,
            'middle_name' : data[0].middle_name,
            'last_name':  data[0].last_name,
            'degree':  data[0].degree,
            'classification': data[0].classification,
            'college' : data[0].college
          });
        });

      }
    }

    $scope.Update_Student_Info = function() {
      let gName =  document.querySelector('#student-firstname').value;
      let mName =  document.querySelector('#student-middlename').value;
      let lName =  document.querySelector('#student-lastname').value;
      let sDegree =  document.querySelector('#student-degree').value;
      let sClassification =  document.querySelector('#student-classification').value;
      let sCollege =  document.querySelector('#student-college').value;

      $scope.newStudent.push({
        'given_name' : gName,
        'middle_name' : mName,
        'last_name':  lName,
        'degree':  sDegree,
        'classification': sClassification,
        'college' : sCollege
      });
      SectionService.Update_Student(student_id, $scope.newStudent[0])
      .then(function(data){

        $scope.newStudent.given_name = "";
        $scope.newStudent.middle_name = "";
        $scope.newStudent.last_name = "";
        $scope.newStudent.degree = "";
        $scope.newStudent.classification = "";
        $scope.newStudent.college = "";
      });
      Materialize.toast('Student Successfully Edited!', 3000, 'rounded');
      SectionService.Get_Student_Per_Lab_Section(localStorage.getItem("course_code"), localStorage.getItem("section_name"), localStorage.getItem("section_code"))
        .then(function(data) {
         $scope.student_per_lab = [];
          for(var i = 0 ; i < data.length; i++){
            $scope.student_per_lab.push(data[i]);
          }
       });
    }

    $scope.check_given_name_change = function(){
      var new_name = document.querySelector('#student-firstname').value;
      if (old_student_given_name===new_name) gname=false;
  		else gname = true;
    }

    $scope.check_middle_name_change = function(){
      var new_name = document.querySelector('#student-middlename').value;
      if (old_student_middle_name===new_name) mname=false;
  		else mname = true;
    }

    $scope.check_last_name_change = function(){
      var new_name = document.querySelector('#student-lastname').value;
      if (old_student_last_name===new_name) lname=false;
  		else lname = true;
    }

    $scope.check_degree_change = function(){
      var new_degree = document.querySelector('#student-degree').value;
      if (old_student_degree===new_degree) degree=false;
  		else degree = true;
    }

    $scope.check_classification_change = function(){
      var new_classification = document.querySelector('#student-classification').value;
      if (old_student_classification===new_classification) classification=false;
  		else classification = true;
    }

    $scope.check_college_change = function(){
      var new_college = document.querySelector('#student-college').value;
      if (old_student_college===new_college) college=false;
  		else college = true;
    }


  }
})();
