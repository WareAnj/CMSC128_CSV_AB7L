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
    var gnchanged = false;
    var mnchanged = false;
    var lnchanged = false;
    var clchanged = false;
    var namep = new RegExp("[A-Za-z\.\-\s]*[A-Za-z\.\-\s]+");
    
    $scope.faculty_user_classes = [];
    $scope.faculty_user_info = [];
    $scope.student_info = [];

    $scope.Get_User = function(){
      CourseService.Get_User()
        .then(function(data){
          $scope.faculty_user_info = [];
          $scope.faculty_user_info.push(data);
          user_id = data.id;
          oclass = data.classification;
          ogname = data.given_name;
          omname = data.middle_name;
          olname = data.last_name;
          uname = data.username;
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
		
		var err = false;
		
		if(gnchanged || mnchanged || lnchanged){
			var ngname = document.querySelector('#fname-input').value;
			var nmname = document.querySelector('#mname-input').value;
			var nlname = document.querySelector('#lname-input').value; 
			if (ngname===""){
				Materialize.toast('Given Name can not be blank!', 3000, 'rounded');
				err = true;
			}
			if (!(namep.test(ngname))){
				Materialize.toast('Invalid Given Name format!', 3000, 'rounded');
				err = true;
			}
			if (nmname===""){
				Materialize.toast('Middle Name can not be blank!', 3000, 'rounded');
				err = true;
			}
			if (!(namep.test(ngname))){
				Materialize.toast('Invalid Middle Name format!', 3000, 'rounded');
				err = true;
			}
			if (nlname===""){
				Materialize.toast('Last Name can not be blank!', 3000, 'rounded');
				err = true;
			}
			if (!(namep.test(nlname))){
				Materialize.toast('Invalid Last Name format!', 3000, 'rounded');
				err = true;
			}
			if(!err){
				$http.post(
					'faculty_user/update_name/',
					{given_name: ngname, middle_name: nmname, last_name: nlname, username: uname}
				);
				ogname = ngname;
				omname = nmname;
				olname = nlname;
				$scope.faculty_user_info[0].given_name = ngname;
				$scope.faculty_user_info[0].middle_name = nmname;
				$scope.faculty_user_info[0].last_name = nlname;
			}
		}
		
		if(!err) Materialize.toast('Profile updated!', 3000, 'rounded');
	}
	
	$scope.check_gname_changes = function() {
		var ngname = document.querySelector('#fname-input').value;
		if (ogname===ngname) gnchanged=false;
		else gnchanged = true;
	}
	
	$scope.check_mname_changes = function() {
		var nmname = document.querySelector('#mname-input').value;
		if (omname===nmname) mnchanged=false;
		else mnchanged = true;
	}
	
	$scope.check_lname_changes = function() {
		var nlname = document.querySelector('#lname-input').value;
		if (olname===nlname) lnchanged=false;
		else lnchanged = true;
	}

    $scope.Get_Course = function(){
      CourseService.Get_Course(user_id)
        .then(function(data){
          $scope.faculty_user_classes = [];
          for(var i = 0; i < data.length; i++){
            $scope.faculty_user_classes.push(data[i]);
          }
        });
    }

    $scope.Get_Lecture_Section = function(course_code){
      CourseService.Get_Lecture_Section(course_code)
      .then(function(data){

      });
    }

    $scope.Get_Course_Id = function(c_id){
      localStorage.setItem("Course_id", c_id);
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