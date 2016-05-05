(function() {
  'use strict';

  angular
    .module('app')
    .controller('RandomCtrl', RandomCtrl);

  RandomCtrl.$inject = ["$scope", "$location", "RandomService"];

  function RandomCtrl($scope, $location, RandomService) {
    $scope.students = [];
    $scope.labdata = [];
    $scope.labSections = [];
    var randdata = {};

    $scope.user_id = localStorage.getItem("user_id");
    $scope.course_code = localStorage.getItem("course_code");
    $scope.section_name = localStorage.getItem("section_name");
    $scope.course_id = localStorage.getItem("course_id");


     $scope.GetLabs = function() {

        RandomService.GetLabs($scope.section_name, $scope.course_id)
          .then(function(data) {
            for(var i = 0 ; i < data.length; i++){
              $scope.labdata.push(data[i]);
              $scope.labSections.push(data[i].code);
            }
         }); 

      }

    $scope.Randomize = function() { 

       $scope.students = [];      

      //randomize per lab section
      if($scope.counts.whole == 0){
         
         for(var i = 0; i < $scope.labSections.length; i++){

          var varlab = $scope.labSections[i];

            randdata = {
              "user_id":$scope.user_id, 
              "course_code":$scope.course_code, 
              "section_name":$scope.section_name,
              "section_code":varlab,
              "limit": $scope.counts[varlab]
            };
            
              RandomService.Randomize(randdata)
              .then(function(data) {
                for(var i = 0; i < data.length; i++)
                  $scope.students.push(data[i]);

              });

         }          
      
      }


      //Whole section
      if($scope.counts.whole != 0){
         
          randdata = {
          "user_id":$scope.user_id,
          "course_code":$scope.course_code,
          "section_name":$scope.section_name,
          "limit":$scope.counts.whole
        };

          RandomService.Randomize(randdata)
          .then(function(data) {
            for(var i = 0; i < data.length; i++)
              $scope.students.push(data[i]);
          });

      }

    }
  }
})();
