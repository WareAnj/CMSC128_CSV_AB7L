(function(){
  'use strict';

  angular
    .module('app')
    .controller('CourseCtrl', CourseCtrl);

  CourseCtrl.$inject = ["$scope", "$location", "CourseService"];

  function CourseCtrl($scope, $location, CourseService){
    var user_id;
    $scope.faculty_user_classes = [];

    $scope.Get_User_Id = function(){
      CourseService.Get_User_Id()
        .then(function(data){
          user_id = data[0].faculty_user_id;
        });
    }

    $scope.Get_Classes = function(){
      CourseService.Get_Classes(user_id)
        .then(function(data){
          $scope.faculty_user_classes = [];
          for(var i = 0; i < data.length; i++){
            $scope.faculty_user_classes.push({
              'code':data[i].code,
              id:data[i].id,
              'description':data[i].description,
              'title': data[i].title
            });
          }
        });
    }

    $scope.Add_Class = function(){
      CourseService.Add_Class(user_id, $scope.newCourse)
        .then(function(data){
          $scope.newCourse.course_code = "";
          $scope.newCourse.course_title = "";
          $scope.newCourse.course_description = "";
          $scope.faculty_user_classes.push({
            'code':data.code,
            id:data.id,
            'description':data.description,
            'title': data.title
          });
          Materialize.toast('Course added!', 3000, 'rounded');
          $('#addModal').closeModal();
        });

        CourseService.Get_Classes(user_id)
          .then(function(data){
            $scope.faculty_user_classes = [];
            for(var i = 0; i < data.length; i++){
              $scope.faculty_user_classes.push({
                'code':data[i].code,
                id:data[i].id,
                'description':data[i].description,
                'title': data[i].title
              });
            }
          });
    }

    $scope.Edit_Class = function(id){
      $("#editModal").openModal();
      CourseService.Edit_Class(user_id, id, $scope.course)
        .then(function(data){
          $scope.course.course_code = "";
          $scope.course.course_title = "";
          $scope.course.course_description = "";
          Materialize.toast('Course Edited!', 3000, 'rounded');
          $('#editModal').closeModal();
        });

        CourseService.Get_Classes(user_id)
          .then(function(data){
            $scope.faculty_user_classes = [];
            for(var i = 0; i < data.length; i++){
              $scope.faculty_user_classes.push({
                'code':data[i].code,
                id:data[i].id,
                'description':data[i].description,
                'title': data[i].title
              });
            }
          });
    }

    $scope.Delete_Class = function(id){
      CourseService.Delete_Class(user_id, id)
        .then(function(data){

        });

      CourseService.Get_Classes(user_id)
        .then(function(data){
          $scope.faculty_user_classes = [];
          for(var i = 0; i < data.length; i++){
            $scope.faculty_user_classes.push({'code':data[i].code, id:data[i].id});
          }
        });
    }
  }
})();
