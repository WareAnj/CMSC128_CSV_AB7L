(function(){
  'use strict';

  angular
    .module('app')
    .controller('CourseCtrl', CourseCtrl);

  CourseCtrl.$inject = ["$scope", "$location", "CourseService"];

  function CourseCtrl($scope, $location, CourseService){
    var toedit;
    var course_id;
    var oclass;
    $scope.faculty_user_courses = [];
    $scope.faculty_user_info = [];
    $scope.student_info = [];

    $scope.Get_User = function(){
      CourseService.Get_User()
        .then(function(data){
          console.log(data);
          $scope.faculty_user_info = [];
          $scope.faculty_user_info.push(data);
        });
    }

    $scope.Get_Course = function(){
      CourseService.Get_Course()
        .then(function(data){
          $scope.faculty_user_courses = [];
          for(var i = 0; i < data.length; i++){
            $scope.faculty_user_courses.push(data[i]);
          }
        });
    }

    $scope.Add_Course = function(){
      CourseService.Add_Course($scope.newCourse)
      .then(function(data){
        $scope.newCourse.course_code = "";
        $scope.newCourse.course_title = "";
        $scope.newCourse.course_description = "";
        $scope.faculty_user_courses.push(data);
        Materialize.toast('Course added!', 5000, 'rounded');
        $('#addModal').closeModal();
      });

      CourseService.Get_Course()
      .then(function(data){
      });

      CourseService.Get_Course()
      .then(function(data){
        $scope.faculty_user_courses = [];
        for(var i = 0; i < data.length; i++){
          $scope.faculty_user_courses.push(data[i]);
        }
      });
    }

    $scope.Get_Course_Id = function(c_id){
      localStorage.setItem("Course_id", c_id);
    }


    $scope.openModal = function(id){
      $("#editModal").openModal();
      toedit = id;
    }

    $scope.Edit_Class = function(){
      CourseService.Edit_Class(toedit, $scope.course)
        .then(function(data){
          $scope.course.course_code = "";
          $scope.course.course_title = "";
          $scope.course.course_description = "";
          Materialize.toast('Course Edited!', 3000, 'rounded');
          $('#editModal').closeModal();
        });

        CourseService.Get_Classes()
          .then(function(data){
            $scope.faculty_user_courses = [];
            for(var i = 0; i < data.length; i++){
              $scope.faculty_user_courses.push({
                'code':data[i].code,
                id:data[i].id,
                'description':data[i].description,
                'title': data[i].title
              });
            }
          });
    }

    $scope.Delete_Class = function(id){
      CourseService.Delete_Class(id)
        .then(function(data){ });

      CourseService.Get_Classes()
        .then(function(data){
          $scope.faculty_user_courses = [];
          for(var i = 0; i < data.length; i++){
            $scope.faculty_user_courses.push({
              'code':data[i].code,
              id:data[i].id,
              'description':data[i].description,
              'title': data[i].title
            });
          }
        });
    }

    $scope.Get_Lecture_Class = function(){
      course_id = localStorage.getItem("Course_id");
      CourseService.Get_Lecture_Class(course_id)
        .then(function(data){
          $scope.student_info = [];
          for(var i = 0; i < data.length; i++){
            $scope.student_info.push({
              'given_name':data[i].given_name,
              'middle_name':data[i].middle_name,
              'last_name':data[i].last_name,
              'student_number':data[i].student_number,
              'name':data[i].name,
              'code':data[i].code
            });
        }
        });
    }
  }
})();
