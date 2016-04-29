(function(){
  'use strict';

  angular
    .module('app')
    .controller('CourseCtrl', CourseCtrl);

  CourseCtrl.$inject = ["$scope", "$location", "$http", "CourseService"];

  function CourseCtrl($scope, $location, $http, CourseService){
    var user_id;
    var toedit;
    var course_id;
    var oclass;
    var ogname;
    var omname;
    var olname;
    var uname;
    
    $scope.faculty_user_classes = [];
    $scope.faculty_user_info = [];
    $scope.student_info = [];

    $scope.Get_User_Id = function(){
      user_id = localStorage.getItem("User_id");
      CourseService.Get_User_Id(user_id)
        .then(function(data){
          $scope.faculty_user_info = [];
          $scope.faculty_user_info.push({
            'given_name':data[0].given_name,
            'middle_name':data[0].middle_name,
            'last_name':data[0].last_name,
            'classification':data[0].classification,
            'employee_id':data[0].employee_id,
            'username':data[0].username
          });
          user_id = data[0].id;
          oclass = data[0].classification;
          ogname = data[0].given_name;
          omname = data[0].middle_name;
          olname = data[0].last_name;
          uname = data[0].username;
          $scope.selectd = {
          	repeatSelect: null,
          	options: [
          		{id: "Instructor I", name: "Instructor I"},
          		{id: "Instructor II", name: "Instructor II"},
          		{id: "Instructor III", name: "Instructor III"},
          		{id: "Instructor IV", name: "Instructor IV"},
          		{id: "Instructor V", name: "Instructor V"},
          		{id: "Instructor VI", name: "Instructor VI"},
          		{id: "Assistant Professor I", name: "Assistant Professor I"},
          		{id: "Assistant Professor II", name: "Assistant Professor II"},
          		{id: "Assistant Professor III", name: "Assistant Professor III"},
          		{id: "Assistant Professor IV", name: "Assistant Professor IV"},
          		{id: "Assistant Professor V", name: "Assistant Professor V"},
          		{id: "Assistant Professor VI", name: "Assistant Professor VI"},
          		{id: "Professor I", name: "Professor I"},
          		{id: "Professor II", name: "Professor II"},
          		{id: "Professor III", name: "Professor III"},
          		{id: "Professor IV", name: "Professor IV"},
          		{id: "Professor V", name: "Professor V"},
          		{id: "Professor VI", name: "Professor VI"}
          	]
          };
        });
    }
	
	$scope.Update_Details = function() {
		var ngname = document.querySelector('#fname-input').value;
		if(ogname!=ngname){
			$http.post(
				'faculty_user/update_given_name/',
				{given_name: ngname, username: uname}
				).then(
				function(response){
					if(response.data){
						//
					}
				}
			);
		}
	}
	
    $scope.Get_Classes = function(){
      CourseService.Get_Classes(user_id)
        .then(function(data){
          $scope.faculty_user_classes = [];
          for(var i = 0; i < data.length; i++){
            $scope.faculty_user_classes.push({
              id:data[i].id,
              'code':data[i].code,
              'name':data[i].name
            });
          }
        });
    }

    $scope.Get_Course_Id = function(c_id){
      localStorage.setItem("Course_id", c_id);
    }

    $scope.Get_Lab_Section = function(course_code){
      CourseService.Get_Lab_Section(course_code)
        .then(function(data){
          
        });
    }

    $scope.Add_Class = function(){
      CourseService.Add_Class(user_id, $scope.newCourse)
        .then(function(data){
          $scope.newCourse.course_code = "";
          $scope.newCourse.course_title = "";
          $scope.newCourse.course_description = "";
          $scope.faculty_user_classes.push({
            'code':        data.code,
             id:           data.id,
            'description': data.description,
            'title':       data.title
          });
          Materialize.toast('Course added!', 3000, 'rounded');
          $('#addModal').closeModal();
        });

        CourseService.Get_Classes(user_id)
          .then(function(data){ });

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

    $scope.openModal = function(id){
      $("#editModal").openModal();
      toedit = id;
    }

    $scope.Edit_Class = function(){
      CourseService.Edit_Class(user_id, toedit, $scope.course)
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
        .then(function(data){ });

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
