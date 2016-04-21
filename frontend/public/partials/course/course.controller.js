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
            $scope.faculty_user_classes.push({'code':data[i].code, id:data[i].id});
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
