'use strict';

(() => {
    angular.module('app')
            .controller('AdminCtrl', AdminCtrl);

    AdminCtrl.$inject = ['$scope', '$http', '$q', 'AdminService'];

    function AdminCtrl($scope, $http, $q, AdminService) {

        $scope.userList = [];

        $scope.order = (predicate) => {
          $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
          $scope.predicate = predicate;
        }

        $scope.Logout = () => {
        AdminService.Logout()
            .then((data) => {
            });
        }

        $scope.GetUsers = () => {
            $scope.userList = [];
            AdminService.GetUsers()
              .then(function(data){
                  let length = data[0].length;
                  for (let i = 0; i < length; i++) {
                      $scope.userList.push(data[0][i]);
                  }
              });
        }

        $scope.ApproveUser = (id, username) => {
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

                $scope.userList.splice(index, 1);
            }

            if(index === -1) {
                Materialize.toast('Something has gone wrong.', 5000);
                return;
            }
        }


        $scope.GetAllLogin = () =>  {
            $scope.userList = [];
            AdminService
                .GetAllLogin()
                .then((data) => {
                    let length = data.length;
                    for (let i = 0; i < length; i++) {
                        $scope.userList.push(data[i]);
                    }
                });

            $('#logintable').show();
            $('#logouttable').hide();
        }

        $scope.GetAllLogout = () =>  {
            $scope.userList = [];
            AdminService
                .GetAllLogout()
                .then((data) => {
                    let length = data.length;
                    for (let i = 0; i < length; i++) {
                        $scope.userList.push(data[i]);
                    }
                });

            $('#logintable').hide();
            $('#logouttable').show();
        }

        $scope.GetSpecificLogin = () => {
            var id = prompt("Please enter ID of Faculty User");

            $scope.userList = [];
            AdminService
                .GetSpecificLogin(id)
                .then((data) => {
                    let length = data.length;
                    for (let i = 0; i < length; i++) {
                        $scope.userList.push(data[i]);
                    }
                });

            $('#logintable').show();
            $('#logouttable').hide();
        }

        $scope.GetSpecificLogout = () => {
            var id = prompt("Please enter ID of Faculty User");

            $scope.userList = [];
            AdminService
                .GetSpecificLogout(id)
                .then((data) => {
                    let length = data.length;
                    for (let i = 0; i < length; i++) {
                        $scope.userList.push(data[i]);
                    }
                });

            $('#logintable').hide();
            $('#logouttable').show();
        }

        $scope.GetAllApproved = () => {
            $scope.userList = [];
            AdminService
                .GetAllApproved()
                .then((data) => {
                    let length = data[0].length;
                    for (let i = 0; i < length; i++) {
                        $scope.userList.push(data[0][i]);
                    }
                });
        }
    }
})();
