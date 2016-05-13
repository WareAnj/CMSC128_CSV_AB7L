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
    let desns;
    let titlchged = false;
    let codechged = false;
    let descchged = false;
    let clrschged = false;
    let gnchanged = false;
    let mnchanged = false;
    let lnchanged = false;
    let clchanged = false;
    let colorchanged = false;
    let namep = new RegExp(/^[A-Za-z\-\s]+$/);
    let textRegex = new RegExp(/^[A-Za-z0-9\s]+$/);

    $scope.Get_User = function() {
      CourseService.Get_User()
        .then(function(data){
          $scope.faculty_user_info = [];
          $scope.faculty_user_info.push(data);
          localStorage.setItem("user_id", data.id);
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
          desns = data.design_setting;
          if(desns === 'default.css') {
            $scope.faculty_user_info[0].design_setting_name = 'Default';
          } else if(desns === 'maroon.css') {
            $scope.faculty_user_info[0].design_setting_name = 'Maroon';
          } else if(desns === 'grey.css') {
            $scope.faculty_user_info[0].design_setting_name = 'Grey';
          } else if(desns === 'purple.css') {
            $scope.faculty_user_info[0].design_setting_name = 'Purple';
          }
        });
    }

   $scope.Get_Course = function() {
      CourseService.Get_Course(localStorage.getItem("user_id"))
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

      CourseService.Get_User()
        .then(function(data){
          $scope.faculty_user_info = [];
          $scope.faculty_user_info.push(data);
          if((!($("#profile-setting").length))&&$scope.faculty_user_info[0].design_setting !== 'default.css'){
            	$("head").append("<link id='profile-setting' type='text/css' rel='stylesheet' href='../assets/stylesheets/"+$scope.faculty_user_info[0].design_setting+"'>");
          }

        });
    }

    $scope.Get_Selected_Course = function(course_id) {
      $("#addLecture").openModal();
      localStorage.setItem("course_id", course_id);
    }

    $scope.Add_Course = function() {
    	console.log($scope.newCourse);
      CourseService.Add_Course($scope.newCourse)
      .then(function(data) {
        $scope.newCourse.course_code = "";
        $scope.newCourse.course_title = "";
        $scope.newCourse.course_description = "";
        $scope.faculty_user_courses.push(data);
        Materialize.toast('Course added!', 5000, 'rounded');
        $("#submit-button-add").attr('disabled', 'disabled');
        $("#submit-button-add").addClass('disabled');
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
      ocode = course.code;
      otitl = course.title;
      odesc = course.description;
      localStorage.setItem("course_id", course.id);
    }

    $scope.Edit_Course = function() {
      if(!(codechged||titlchged||descchged))
      	return;
      $scope.course.course_code = document.querySelector('#new-code-input').value;
      $scope.course.course_title = document.querySelector('#new-title-input').value;
      $scope.course.course_description = document.querySelector('#new-desc-input').value;
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
		var ncode = document.querySelector("#new-code-input").value;
		if(ocode===ncode) codechged = false;
		else codechged = true;
	}

	$scope.check_course_title_changes = function(){
		var ntitl = document.querySelector("#new-title-input").value;
		if(otitl===ntitl) titlchged = false;
		else titlchged = true;
	}

	$scope.check_course_description_changes = function(){
		var ndesc = document.querySelector("#new-desc-input").value;
		if(odesc===ndesc) descchged = false;
		else descchged = true;
	}

    $scope.Delete_Course = function(id) {
    if (confirm("Are you sure you want to delete this course?")) {
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
    }

    $scope.Add_Lecture = function(){
      CourseService.Add_Lecture(localStorage.getItem("course_id"), $scope.newLecture)
        .then(function(data) {
            $scope.newLecture.section_name = "";
            Materialize.toast('Lecture Section added!', 5000, 'rounded');
            localStorage.setItem("course_id", "")
            $("#submit-button-add-lecture").attr('disabled', 'disabled');
            $("#submit-button-add-lecture").addClass('disabled');
            $('#addLecture').closeModal();
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

    $scope.Get_Selected_Lecture = function(c_id, c_code, c_title, c_desc, section_name) {
      localStorage.setItem("course_id", c_id);
      localStorage.setItem("course_code", c_code);
      localStorage.setItem("course_title", c_title);
      localStorage.setItem("course_description", c_desc);
      localStorage.setItem("section_name", section_name);
      $('.showsidenav').sideNav('hide');
      if($route.current.loadedTemplateUrl != 'views/home.view.html') {
        $route.reload();
      }
    }

    $scope.Delete_Selected_Lecture = function(c_code, section_name) {
    if (confirm("Are you sure you want to delete this section?")) {
        localStorage.setItem("course_code", c_code);
        localStorage.setItem("section_name", section_name);
        CourseService.Delete_Lecture(localStorage.getItem("course_code"), localStorage.getItem("section_name"))
          .then(function(data) {
              Materialize.toast('Lecture Section Deleted!', 5000, 'rounded');
              localStorage.setItem("course_code", "");
              localStorage.setItem("section_name", "");
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
    }


    // Update USER Details
  	$scope.Update_Details = function() {

		var err = false;
		var npassw = document.querySelector('#password-input').value;
		var cpassw = document.querySelector('#confirm-password').value;
		var ndes = document.querySelector('#cprofile-input').value;

		$scope.check_classification();

		if(ndes!==desns){
			$http.post(
				'faculty_user/update_design/',
				{username: uname, design_setting: ndes}
			);
			desns = ndes;
			$scope.faculty_user_info[0].design_setting = ndes;
			if (desns==='default.css')
				$scope.faculty_user_info[0].design_setting_name = 'Default';
			else if (desns==='maroon.css')
				$scope.faculty_user_info[0].design_setting_name = 'Maroon';
			else if (desns==='grey.css')
				$scope.faculty_user_info[0].design_setting_name = 'Grey';
			else if (desns==='purple.css')
				$scope.faculty_user_info[0].design_setting_name = 'Purple';
			clrschged = true;
		}

		if(npassw!==""){
			if (npassw!==cpassw){
				Materialize.toast('Passwords do not match!', 3000, 'rounded');
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
			if (!(namep.test(nmname))){
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
			if (!(namep.test(nmname))){
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

		if((!err) && (gnchanged || mnchanged || lnchanged || clchanged || (npassw!=="") || (clrschged))){
			Materialize.toast('Profile updated!', 3000, 'rounded');
			clrschged = false;
			clchanged = false;
			lnchanged = false;
			mnchanged = false;
			gnchanged = false;
		}
		if((npassw!=="")&&(!err)){
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
        	$("#submit-button-add").addClass('disabled');
        	c_code_add = false;
  	  }
  	  else{
		  if(!(textRegex.test(course_code))){
				if(!($("#code-input").hasClass('invalid'))){
					$("#ccodeAddLabel").attr('data-error','Invalid Course Code format!');
					$("#code-input").addClass('invalid');
				}
				c_code_add = false;
		  }
		  else if(course_code.length>16){
			if(!($("#code-input").hasClass('invalid'))){
				$("#ccodeAddLabel").attr('data-error','Course code cannot be greater than 16 characters!');
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
	  }
      if (course_title===""){
        $("#submit-button-add").attr('disabled', 'disabled');
        $("#submit-button-add").addClass('disabled');
        if($("#title-input").hasClass('invalid')){
  	  			$("#title-input").removeClass('invalid');
  	  	}
        c_title_add = false;
      } else {
        if (!(textRegex.test(course_title))){
          if(!($("#title-input").hasClass('invalid'))){
  	  			$("#title-input").addClass('invalid');
  	  	  }
          c_title_add = false;
        } else{
        	if($("#title-input").hasClass('invalid')){
  	  			$("#title-input").removeClass('invalid');
  	  	  	}
            c_title_add = true;
        }
      }

      if (course_description===""){
        $("#submit-button-add").attr('disabled', 'disabled');
        $("#submit-button-add").addClass('disabled');
        if($("#desc-input").hasClass('invalid')){
  	  			$("#desc-input").removeClass('invalid');
  	  	}
        c_description_add = false;

      } else {
        if (!(textRegex.test(course_description))){
          if(!($("#desc-input").hasClass('invalid'))){
  	  			$("#desc-input").addClass('invalid');
  	  	  }
          c_description_add = false;
        } else{
        	if($("#desc-input").hasClass('invalid')){
  	  			$("#desc-input").removeClass('invalid');
  	  	  	}
            c_description_add = true;
        }
      }
		if(!c_code_add){
			return;
		}
  		$http.post(
  			"course/check_course_code/", $scope.newCourse
  			).then(function(response){
  				if (response.data){
  					if(!($("#code-input").hasClass('invalid'))){
  						$("#ccodeAddLabel").attr('data-error','Course Code already exists!');
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

			  if(c_code_add && c_title_add && c_description_add){
				$("#submit-button-add").removeAttr('disabled');
				$("#submit-button-add").removeClass('disabled');
			  }else{
				$("#submit-button-add").attr('disabled', 'disabled');
				$("#submit-button-add").addClass('disabled');
			  } 
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
        	c_code_edit = false;
  	  }
  	  else{
  	  	if(!(textRegex.test(course_code))){
  			$("#crs-input-label").attr('data-error','Invalid Course Code format!')
  			if(!($("#new-code-input").hasClass('invalid'))){
  				$("#new-code-input").addClass('invalid');
  			}
  			c_code_edit = false;
  		}
  		else{
  			if($("#new-code-input").hasClass('invalid')){
  				$("#new-code-input").removeClass('invalid');
  			}
  		}
  	  }

      if (course_title===""){
        if($("#new-title-input").hasClass('invalid')){
        	$("#new-title-input").removeClass('invalid');
        }
        c_title_edit = false;
      }
      else {
        if (!(textRegex.test(course_title))){
          if(!($("#new-title-input").hasClass('invalid'))){
        		$("#new-title-input").addClass('invalid');
          }
          c_title_edit = false;
        }
        else{
        	if($("#new-title-input").hasClass('invalid')){
				$("#new-title-input").removeClass('invalid');
			}
            c_title_edit = true;
        }
      }

      if (course_description===""){
        if($("#new-desc-input").hasClass('invalid')){
			$("#new-desc-input").removeClass('invalid');
		}
        c_description_edit = false;

      }
      else {
        if (!(textRegex.test(course_description))){
          if(!($("#new-desc-input").hasClass('invalid'))){
				$("#new-desc-input").addClass('invalid');
		  }
          c_description_edit = false;
        }
        else{
        	if($("#new-desc-input").hasClass('invalid')){
				$("#new-desc-input").removeClass('invalid');
			}
            c_description_edit = true;
        }
      }

	  if(!c_code_edit){
		return;
	  }

  		$http.post(
  			"course/check_course_code/", $scope.course
  			).then(function(response){
  				if (response.data){
  					if(!($("#new-code-input").hasClass('invalid'))){
  						$("#crs-input-label").attr('data-error','Course Code already exists!')
  						$("#new-code-input").addClass('invalid');
  					}
            		if((course_code===ocode)&&($("#new-code-input").hasClass('invalid'))){
              			$("#new-code-input").removeClass('invalid');
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

    $scope.check_section_name = function(){
  		let section_name = document.querySelector('#section-name-input').value;
      let textReg = new RegExp("[A-Za-z0-9]+\s*[A-Za-z0-9]*");

      if(section_name==="" && !textReg.test(section_name)) {
  		 	if($("#section-name-input").hasClass('invalid')){
  		 		 $("#section-name-input").removeClass('invalid');
  		 	}
        $("#submit-button-add-lecture").attr('disabled', 'disabled');
        $("#submit-button-add-lecture").addClass('disabled');
  	  }

  		$http.post(
  			"course/lecture/check_section_name?course_id=" + localStorage.getItem("course_id"),  $scope.newLecture
  			).then(function(response){;
  				if (response.data){
  					if(!($("#section-name-input").hasClass('invalid'))){
  						$("#section-name-input").addClass('invalid');
  					}
            $("#submit-button-add-lecture").attr('disabled', 'disabled');
            $("#submit-button-add-lecture").addClass('disabled');
          } else {
  					if($("#section-name-input").hasClass('invalid')){
  						$("#section-name-input").removeClass('invalid');
  					}
            if(section_name!=="" && textReg.test(section_name)) {
              $("#submit-button-add-lecture").attr('disabled', false);
            $("#submit-button-add-lecture").removeClass('disabled');
            }
      		}
        }

  		);
  	}
  }
})();
