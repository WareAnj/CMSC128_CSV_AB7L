(function() {
  'use strict';

  angular
    .module('app')
    .controller('CourseCtrl', CourseCtrl);

  CourseCtrl.$inject = ["$scope", "$location", "$http", "CourseService", "$route"];

  function CourseCtrl($scope, $location, $http, CourseService, $route) {
    $scope.faculty_user_courses = [];
    $scope.faculty_user_info = [];
    $scope.selected_course_info = [];

    let c_code_add;
    let c_title_add;
    let c_description_add;

    let c_code_edit;
    let c_title_edit;
    let c_description_edit;
    let user_id;
    let oclass;
    let ogname;
    let omname;
    let olname;
    let uname;
    let ocode;
    let otitl;
    let odesc;
    let ocolor;
    let titlchged = false;
    let codechged = false;
    let descchged = false;
    let gnchanged = false;
    let mnchanged = false;
    let lnchanged = false;
    let clchanged = false;
    let colorchanged = false;
    let namep = new RegExp("[A-Za-z\.\-\s]*[A-Za-z\.\-\s]+");
    let textRegex = new RegExp("[A-Za-z0-9\s]+");

    $scope.Get_User = function() {
      CourseService.Get_User()
        .then(function(data){
          $scope.faculty_user_info = [];
          $scope.faculty_user_info.push(data);
          localStorage.setItem("user_id", "");
          localStorage.setItem("course_id", "");
          localStorage.setItem("course_code", "");
          localStorage.setItem("course_title", "");
          localStorage.setItem("course_description", "");
          localStorage.setItem("section_name", "");
          localStorage.setItem("section_code", "");
          user_id = data.id;
          oclass = data.classification;
          ogname = data.given_name;
          omname = data.middle_name;
          olname = data.last_name;
          uname = data.username;
          ocolor = data.design_setting;
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
          $scope.selectcolor = {
            repeatSelect: null,
            options: [
              {id: "default.css", name: "default.css"},
              {id: "maroon.css", name: "maroon.css"},
              {id: "grey.css", name: "grey.css"},
              {id: "purple.css", name: "purple.css"}
            ]
          };
        });
    }

   $scope.Get_Course = function() {
      CourseService.Get_Course(user_id)
        .then(function(data) {
          $scope.faculty_user_courses = [];
          for(let i = 0; i < data.length; i++) {
            CourseService.Get_Lecture(data[i].id)
              .then(function(data2) {
                  $scope.faculty_user_courses.push({
                    'code': data[i].code,
                    'course_id': data[i].course_id,
                    'description': data[i].description,
                    'faculty_user_id': data[i].faculty_user_id,
                    'id': data[i].id,
                    'title': data[i].title,
                    'lecture' : data2
                  });
              });
          }
        });
    }

    $scope.Add_Course = function() {
      CourseService.Add_Course($scope.newCourse)
      .then(function(data) {
        $scope.newCourse.course_code = "";
        $scope.newCourse.course_title = "";
        $scope.newCourse.course_description = "";
        $scope.faculty_user_courses.push(data);
        Materialize.toast('Course added!', 5000, 'rounded');
        $('#addModal').closeModal();
      });

      CourseService.Get_Course()
      .then(function(data) {
       });

       CourseService.Get_Course(user_id)
         .then(function(data) {
           $scope.faculty_user_courses = [];
           for(let i = 0; i < data.length; i++) {
             CourseService.Get_Lecture(data[i].id)
               .then(function(data2) {
                   $scope.faculty_user_courses.push({
                     'code': data[i].code,
                     'course_id': data[i].course_id,
                     'description': data[i].description,
                     'faculty_user_id': data[i].faculty_user_id,
                     'id': data[i].id,
                     'title': data[i].title,
                     'lecture' : data2
                   });
               });
           }
         });
    }

    $scope.openModal = function(course) {
      $("#editModal").openModal();
      document.querySelector('#new-code-input').value = course.code;
      document.querySelector('#new-title-input').value = course.title;
      document.querySelector('#new-desc-input').value = course.description;
      localStorage.setItem("course_id", course.id);
    }

    $scope.Edit_Course = function() {
      CourseService.Edit_Course(localStorage.getItem("course_id"), $scope.course)
        .then(function(data) {
          $scope.course.course_code = "";
          $scope.course.course_title = "";
          $scope.course.course_description = "";
          $('#editModal').closeModal();
          $scope.selected_course_info = [];
        });
        Materialize.toast('Course Details Updated!', 5000, 'rounded');


        CourseService.Get_Course(user_id)
          .then(function(data) {
            $scope.faculty_user_courses = [];
            for(let i = 0; i < data.length; i++) {
              CourseService.Get_Lecture(data[i].id)
                .then(function(data2) {
                    $scope.faculty_user_courses.push({
                      'code': data[i].code,
                      'course_id': data[i].course_id,
                      'description': data[i].description,
                      'faculty_user_id': data[i].faculty_user_id,
                      'id': data[i].id,
                      'title': data[i].title,
                      'lecture' : data2
                    });
                });
            }
          });
    }

	$scope.check_course_code_changes = function(){
		let ncode = document.querySelector("#new-code-input").value;
		if(ocode===ncode) codechged = true;
		else codechged = false;
	}
	
	$scope.check_course_title_changes = function(){
		let ntitl = document.querySelector("#new-title-input").value;
		if(otitl===ntitl) titlchged = true;
		else titlchged = false;
	}
	
	$scope.check_course_description_changes = function(){
		let ndesc = document.querySelector("#new-title-input").value;
		if(odesc===ndesc) descchged = true;
		else descchged = false;
	}
	
    $scope.Delete_Course = function(id) {
      CourseService.Delete_Course(id)
        .then(function(data){ });

        CourseService.Get_Course(user_id)
          .then(function(data) {
            $scope.faculty_user_courses = [];
            for(let i = 0; i < data.length; i++) {
              CourseService.Get_Lecture(data[i].id)
                .then(function(data2) {
                    $scope.faculty_user_courses.push({
                      'code': data[i].code,
                      'course_id': data[i].course_id,
                      'description': data[i].description,
                      'faculty_user_id': data[i].faculty_user_id,
                      'id': data[i].id,
                      'title': data[i].title,
                      'lecture' : data2
                    });
                });
            }
          });
    }

    $scope.Get_Selected_Course = function(c_id, c_code, c_title, c_desc, section_name) {
      localStorage.setItem("course_id", c_id);
      localStorage.setItem("course_code", c_code);
      localStorage.setItem("course_title", c_title);
      localStorage.setItem("course_description", c_desc);
      localStorage.setItem("section_name", section_name);
      window.location.href='#/class';
      $('.showsidenav').sideNav('hide');
      $route.reload();
    }

    // Update USER Details
  	$scope.Update_Details = function() {

		var err = false;
		var npassw = document.querySelector('#password-input').value;
		var cpassw = document.querySelector('#confirm-password').value;

		if(npassw!==""){
			if (npassw!==cpassw){
				Materialize.toast('Password do not match!', 3000, 'rounded');
				err = true;
			}
			else{
				$http.post(
					'faculty_user/update_password/',
					{username: uname, password: npassw}
				);
			}
		}

		if((!clchanged)&&(gnchanged || mnchanged || lnchanged)){
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

		else if(clchanged&&(gnchanged || mnchanged || lnchanged)){
			var ngname = document.querySelector('#fname-input').value;
			var nmname = document.querySelector('#mname-input').value;
			var nlname = document.querySelector('#lname-input').value;
			var nclass = document.querySelector('#classification-input').value;

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
					'faculty_user/update_profile/',
					{given_name: ngname, middle_name: nmname, last_name: nlname, classification: nclass, username: uname}
				);
				ogname = ngname;
				omname = nmname;
				olname = nlname;
				oclass = nclass;
				$scope.faculty_user_info[0].given_name = ngname;
				$scope.faculty_user_info[0].middle_name = nmname;
				$scope.faculty_user_info[0].last_name = nlname;
				$scope.faculty_user_info[0].classification = nclass;
			}
		}
		else if(clchanged){
			var nclass = document.querySelector('#classification-input').value;
			$http.post(
				'faculty_user/update_classification/',
				{username: uname, classification: nclass}
			);
			oclass=nclass;
			$scope.faculty_user_info[0].classification = nclass;
		}

    if(colorchanged){
      var ncolor = document.querySelector('#profile-input').value + ".css";
      console.log(ncolor);
      $http.post(
        'faculty_user/update_design/',
        {username: uname, design_setting: ncolor}
      );
      ocolor=ncolor;
      $scope.faculty_user_info[0].design_setting = ncolor;
    }

		if((!err) && (gnchanged || mnchanged || lnchanged || clchanged || (npassw!=="") || colorchanged)) Materialize.toast('Profile updated!', 3000, 'rounded');
		if(npassw!==""){
			document.querySelector('#password-input').value = "";
			document.querySelector('#confirm-password').value = "";
			$('#confirm-password').attr('disabled','disabled');
		}
	}

	$scope.check_password_changes = function() {
		var npassw = document.querySelector('#password-input').value;
		var cpassw = document.querySelector('#confirm-password').value;

		if (npassw===""){
			document.querySelector('#confirm-password').value = "";
			$('#confirm-password').attr('disabled','disabled');

		}
		else if(npassw.length>=8){
			$('#confirm-password').removeAttr('disabled');
		}
	}

	$scope.check_confirm_password = function(){
		var npassw = document.querySelector('#password-input').value;
		var cpassw = document.querySelector('#confirm-password').value;
		if (cpassw===""){
			if($('#password-input').hasClass('invalid')){
				$('#password-input').removeClass('invalid');
			}
			if($('#confirm-password').hasClass('invalid')){
				$('#confirm-password').removeClass('invalid');
			}
		}
		else if (npassw!==cpassw){
			if(!($('#password-input').hasClass('invalid'))){
				$('#password-input').addClass('invalid');
			}
			if(!($('#confirm-password').hasClass('invalid'))){
				$('#confirm-password').addClass('invalid');
			}
		}
		else{
			if($('#password-input').hasClass('invalid')){
				$('#password-input').removeClass('invalid');
			}
			if($('#confirm-password').hasClass('invalid')){
				$('#confirm-password').removeClass('invalid');
			}
		}
	}

  $scope.check_display = function(){
    console.log(ocolor);
    var ncolor = document.querySelector('#profile-input').value + ".css";
    if(ocolor===ncolor) colorchanged = false;
    else colorchanged = true;
  }

	$scope.check_classification = function(){
		var nclass = document.querySelector('#classification-input').value;
		if(oclass===nclass) clchanged = false;
		else clchanged = true;
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

    // checker in add course
    $scope.check_course_code_add = function(){

  		let course_code = document.querySelector('#code-input').value;
      let course_title = document.querySelector('#title-input').value;
      let course_description = document.querySelector('#desc-input').value;
      if (course_code===""){
  			if($("#code-input").hasClass('invalid')){
  				$("#code-input").removeClass('invalid');
  			}
  			$("#submit-button-add").attr('disabled', 'disabled');
        c_code_add = false;
  		}

      if (course_title===""){
        $("#submit-button-add").attr('disabled', 'disabled');
        c_title_add = false;
      } else {
        if (!(textRegex.test(course_title))){
          Materialize.toast('Invalid Course Title format!', 3000, 'rounded');
          c_title_add = false;
        } else{
            c_title_add = true;
        }
      }

      if (course_description===""){
        $("#submit-button-add").attr('disabled', 'disabled');
        c_description_add = false;

      } else {
        if (!(textRegex.test(course_description))){
          Materialize.toast('Invalid Character found!', 3000, 'rounded');
          c_description_add = false;
        } else{
            c_description_add = true;
        }
      }

  		$http.post(
  			"course/check_course_code/", $scope.newCourse
  			).then(function(response){
  				if (response.data){
  					if(!($("#code-input").hasClass('invalid'))){
  						$("#code-input").addClass('invalid');
  					}
  					c_code_add = false;
          }
          else{
  					if($("#code-input").hasClass('invalid')){
  						$("#code-input").removeClass('invalid');
  					}
        		c_code_add = true;
      		  }

          if(c_code_add && c_title_add && c_description_add) $("#submit-button-add").removeAttr('disabled');
          else $("#submit-button-add").attr('disabled', 'disabled');
        }

  		);
  	}

    $scope.check_course_code_edit = function(){

      let course_code = document.querySelector('#new-code-input').value;
      let course_title = document.querySelector('#new-title-input').value;
      let course_description = document.querySelector('#new-desc-input').value;
      if (course_code===""){
  			if($("#new-code-input").hasClass('invalid')){
  				$("#new-code-input").removeClass('invalid');
  			}
  			$("#submit-button-edit").attr('disabled', 'disabled');
        c_code_edit = false;
  		}

      if (course_title===""){
        $("#submit-button-edit").attr('disabled', 'disabled');
        c_title_edit = false;
      } else {
        if (!(textRegex.test(course_title))){
          Materialize.toast('Invalid Course Title format!', 3000, 'rounded');
          c_title_edit = false;
        } else{
            c_title_edit = true;
        }
      }

      if (course_description===""){
        $("#submit-button-edit").attr('disabled', 'disabled');
        c_description_edit = false;

      } else {
        if (!(textRegex.test(course_description))){
          Materialize.toast('Invalid Character found!', 3000, 'rounded');
          c_description_edit = false;
        } else{
            c_description_edit = true;
        }
      }

  		$http.post(
  			"course/check_course_code/", $scope.course
  			).then(function(response){
  				if (response.data){
  					if(!($("#new-code-input").hasClass('invalid'))){
  						$("#new-code-input").addClass('invalid');
  					}
  					c_code_edit = false;
          }
          else{
  					if($("#new-code-input").hasClass('invalid')){
  						$("#new-code-input").removeClass('invalid');
  					}
        		c_code_edit = true;
      		  }

          if(c_code_edit && c_title_edit && c_description_edit) $("#submit-button-edit").removeAttr('disabled');
          else $("#submit-button-edit").attr('disabled', 'disabled');
        }

  		);
  	}
  }
})();
