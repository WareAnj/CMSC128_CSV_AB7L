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
                  let length = data.data[0].length;
                  for (let i = 0; i < length; i++) {
                      $scope.userList.push(data.data[0][i]);
                  }
              });
        }

        $scope.ApproveUser = (id, username) => {
            AdminService
                .ApproveUser(id)
                .then((retdata) => {
                   if(retdata.message = "Faculty user successfully approved!"){
                    let index = -1;
                    let comArr = eval($scope.userList);
                    for (let i = 0; i < comArr.length; i++) {
                        if (comArr[i].username === username) {
                            index = i;
                            break;
                        }
                    }

                    if(index === -1) {  
                        Materialize.toast('Something has gone wrong.', 1000);            
                        return;
                    }
                    
                    Materialize.toast('Successfully approved '+username+'!', 1000);
                    $scope.userList.splice(index, 1);
                  }
                  else
                    Materialize.toast('Something has gone wrong.', 1000);
                });
            
        }


        $scope.GetAllLogin = () =>  {
            $scope.userList = [];
            AdminService
                .GetAllLogin()
                .then((retdata) => {
                    let length = retdata.data.length;
                    for (let i = 0; i < length; i++) {
                        $scope.userList.push(retdata.data[i]);
                    }
                });

            $('#logintable').show();
            $('#logouttable').hide();
        }

        $scope.GetAllLogout = () =>  {
            $scope.userList = [];
            AdminService
                .GetAllLogout()
                .then((retdata) => {
                    let length = retdata.data.length;
                    for (let i = 0; i < length; i++) {
                        $scope.userList.push(retdata.data[i]);
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
                .then((retdata) => {
                    let length = retdata.data.length;
                    for (let i = 0; i < length; i++) {
                        $scope.userList.push(retdata.data[i]);
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
                .then((retdata) => {
                    let length = retdata.data.length;
                    for (let i = 0; i < length; i++) {
                        $scope.userList.push(retdata.data[i]);
                    }
                });

            $('#logintable').hide();
            $('#logouttable').show();
        }

        $scope.GetAllApproved = () => {
            $scope.userList = [];
            AdminService
                .GetAllApproved()
                .then((retdata) => {
                    let length = retdata.data[0].length;
                    for (let i = 0; i < length; i++) {
                        $scope.userList.push(retdata.data[0][i]);
                    }
                });
        }
    }
})();
