(function() {
  'use strict';

  angular
    .module('app')
    .controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ["$scope", "$http", "$q", "AdminService"];

  function AdminCtrl($scope, $http, $q, AdminService) {

    $scope.userList = [];
    
    $scope.order = function(predicate) {
          $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
          $scope.predicate = predicate;
    }

    $scope.Logout = function() {
        AdminService.Logout()
          .then(function(data){
          });
    }

    $scope.GetUsers = function() {
        $scope.userList = [];
        AdminService.GetUsers()
          .then(function(data){
              let length = data[0].length;
              for (let i = 0; i < length; i++) {
                  $scope.userList.push(data[0][i]);
              }
          });
    } 

    $scope.ApproveUser = function(id, username) {
        AdminService.ApproveUser(id)
          .then(function(data){
              //alert("Successfully Approved User: " + username);
              Materialize.toast('Successfully approved '+username+'!', 5000);
          });

        let index = -1;
        let comArr = eval($scope.userList);
        for (let i = 0; i < comArr.length; i++) {
            if (comArr[i].username === username) {
                index = i;
                break;
            }
        }

        if(index === -1) {
            Materialize.toast('Something has gone wrong.', 5000);
            return;
        }

        $scope.userList.splice(index, 1);

      }

     $scope.GetAllLogin = function() {
        $scope.userList = [];
        AdminService.GetAllLogin()
          .then(function(data){
            let length = data.length;
            for (let i = 0; i < length; i++) {
                $scope.userList.push(data[i]);
            }
          });         
     }

     $scope.GetAllLogout = function() { 
        $scope.userList = [];  
        AdminService.GetAllLogout()
          .then(function(data){
            let length = data.length;
            for (let i = 0; i < length; i++) {
                $scope.userList.push(data[i]);
            }
          });         
     }

     $scope.GetSpecificLogin = function(id) {
         $scope.userList = [];
         AdminService.GetSpecificLogin(id)
           .then(function(data){
             let length = data.length;
             for (let i = 0; i < length; i++) {
                 $scope.userList.push(data[i]);
              }
           });
      }

      $scope.GetSpecificLogout = function(id) {
          $scope.userList = [];
          AdminService.GetSpecificLogout(id)
            .then(function(data){
              let length = data.length;
              for (let i = 0; i < length; i++) {
                  $scope.userList.push(data[i]);
              }
            });
      }

      $scope.GetAllApproved = function(){
          $scope.userList = [];
          AdminService.GetAllApproved()
            .then(function(data){
              let length = data[0].length;
              for (let i = 0; i < length; i++) {
                  $scope.userList.push(data[0][i]);
              }
            });
      }

  }
})();
