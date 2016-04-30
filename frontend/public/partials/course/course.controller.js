(function(){
  'use strict';

  angular
    .module('app')
    .controller('CourseCtrl', CourseCtrl);

  CourseCtrl.$inject = ["$scope", "$location", "CourseService"];

  function CourseCtrl($scope, $location, CourseService){
    $scope.faculty_user_courses = [];
    $scope.faculty_user_info = [];
  
    $scope.Get_User = function(){
      CourseService.Get_User()
        .then(function(data){
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

    $scope.openModal = function(c_id){
      $("#editModal").openModal();
      localStorage.setItem("Course_id", c_id);
    }

    $scope.Edit_Course = function(){
      CourseService.Edit_Course(localStorage.getItem("Course_id"), $scope.course)
        .then(function(data){
          $scope.course.course_code = "";
          $scope.course.course_title = "";
          $scope.course.course_description = "";
          $('#editModal').closeModal();
        });
        Materialize.toast('Course Details Updated!', 5000, 'rounded');

        CourseService.Get_Course()
          .then(function(data){
            $scope.faculty_user_courses = [];
            for(var i = 0; i < data.length; i++){
              $scope.faculty_user_courses.push(data[i]);
            }
          });
    }

    $scope.Delete_Course = function(id){
      CourseService.Delete_Course(id)
        .then(function(data){ });

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
  }
})();
