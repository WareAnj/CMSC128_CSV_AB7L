(function() {
  'use strict';

  angular
    .module('app')
    .controller('SectionCtrl', SectionCtrl);

  SectionCtrl.$inject = ["$scope", "$location", "$http", "SectionService", "$route", "$filter", "$rootScope"];

  function SectionCtrl($scope, $location, $http, SectionService, $route, $filter, $rootScope) {
    $scope.section_info = [];
    $scope.lab_sections_info = [];
    $scope.student_info = [];
    $scope.student = [];
    $scope.student_per_lab = [];
    $scope.to_edit_student = [];
    $scope.newStudent = [];
    let student_id;
    let old_student_given_name;
    let old_student_middle_name;
    let old_student_last_name;
    let old_student_degree;
    let old_student_classification;
    let old_student_college;
    let gname = false;
    let mname = false;
    let lname = false;
    let classification = false;
    let degree = false;
    let college = false;
    let gname_add = false;
    let mname_add = false;
    let lname_add = false;
    let classification_add = false;
    let degree_add = false;
    let college_add = false;
    let student_number_add = false;
    let lab_section_name = true;
    let labSectionRegex = new RegExp("^([1-9]|10)L$");

    let course_code;
    let section_name;
    let section_code;
    $scope.Get_Lab_Sections = function() {

      $('#student-classification').material_select();
       SectionService.Get_Lab_Sections(localStorage.getItem("course_id"), localStorage.getItem("section_name"))
         .then(function(data) {
          $scope.lab_sections_info = [];
           for(let i = 0 ; i < data.length; i++){
             if(data[i].code != null){
               $scope.lab_sections_info.push({
                 'course_code': localStorage.getItem('course_code'),
                 'section_name': localStorage.getItem("section_name"),
                 'section_code': data[i].code,
                 'section_id':  data[i].id
               });
            }
           }
        });

        $scope.order_lab('given_name', true);
     }

     $scope.Add_Lab_Section = function() {
       SectionService.Add_Lab_Section(localStorage.getItem('course_code'), localStorage.getItem('section_name'), $scope.newSection)
        .then(function(data) {
          $scope.newSection.code = "";
          Materialize.toast('Section Successfully Added!', 3000, 'rounded');
          $('#addLab-modal').closeModal();
          $("#submit-button").attr('disabled', 'disabled');
          $("#submit-button").addClass('disabled');
        });

        SectionService.Get_Lab_Sections(localStorage.getItem("course_id"), localStorage.getItem("section_name"))
          .then(function(data) {
           $scope.lab_sections_info = [];
            for(let i = 0 ; i < data.length; i++){
              if(data[i].code != null){
                $scope.lab_sections_info.push({
                  'course_code': localStorage.getItem('course_code'),
                  'section_name': localStorage.getItem("section_name"),
                  'section_code': data[i].code,
                  'section_id':  data[i].id
                });
             }
            }
         });
     }

     $scope.Get_Student_Per_Lab_Section = function(section_code) {
       localStorage.setItem("section_code", section_code)
       SectionService.Get_Student_Per_Lab_Section(localStorage.getItem("course_code"), localStorage.getItem("section_name"), localStorage.getItem("section_code"))
         .then(function(data) {
          $scope.student_per_lab = [];
           for(let i = 0 ; i < data.length; i++){
             $scope.student_per_lab.push(data[i]);
           }
        });
     }

    $scope.Get_Class_List = function() {
      SectionService.Get_Class_List(localStorage.getItem("course_id"), localStorage.getItem("section_name"))
        .then(function(data) {
          let i = 0;
          for(i = 0; i < data.length; i++) {
            $scope.student_info.push(data[i]);
          }
          if(i == 0) {
            $('#rand-button').addClass('disabled');
            $('#rand-button').attr('disabled', 'disabled');
          } else {
            if(($("#rand-button").hasClass('disabled'))) {
              $('#rand-button').removeClass('disabled');
              $('#rand-button').attr('disabled', false);
            }
          }
        });

      $scope.section_info = [];
      $scope.section_info.push({
        'course_code': localStorage.getItem("course_code"),
        'section_name': localStorage.getItem("section_name"),
        'course_title': localStorage.getItem("course_title"),
        'course_description': localStorage.getItem("course_description")
      });

      $scope.order('given_name', true);
    }

    $scope.order = function(predicate) {
      let orderBy = $filter('orderBy');
      $scope.predicate = predicate;
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.student_info = orderBy($scope.student_info, predicate, $scope.reverse);
    };

    $scope.order_lab = function(predicate) {
      let orderBy = $filter('orderBy');
      $scope.predicate = predicate;
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.student_per_lab = orderBy($scope.student_per_lab, predicate, $scope.reverse);
    };

    $scope.Get_Selected_Student = function(student_id) {
      localStorage.setItem("student_id", student_id)
      $('#stdInfo1').openModal();
      SectionService.Get_Student(localStorage.getItem("student_id"))
      .then(function(data) {
        $scope.student = [];
        $scope.student.push(data[0]);
      });
    }

    $scope.Delete_Selected_Student = function() {
      SectionService.Delete_Student(student_id)
      .then(function(data){
          Materialize.toast('Student Successfully Deleted!', 3000, 'rounded');
      });

      SectionService.Get_Student_Per_Lab_Section(localStorage.getItem("course_code"), localStorage.getItem("section_name"), localStorage.getItem("section_code"))
        .then(function(data) {
         $scope.student_per_lab = [];
          for(let i = 0 ; i < data.length; i++){
            $scope.student_per_lab.push(data[i]);
          }
       });
    }

    $scope.Delete_Selected_Lab = function() {
      SectionService.Delete_Lab_Section(localStorage.getItem("course_id"), localStorage.getItem("section_id"))
      .then(function(data){
          Materialize.toast('Section Successfully Deleted!', 3000, 'rounded');
          localStorage.setItem("section_id", "");
          $route.reload();
      });

      SectionService.Get_Lab_Sections(localStorage.getItem("course_id"), localStorage.getItem("section_name"))
        .then(function(data) {
         $scope.lab_sections_info = [];
          for(let i = 0 ; i < data.length; i++){
            if(data[i].code != null){
              $scope.lab_sections_info.push({
                'course_code': localStorage.getItem('course_code'),
                'section_name': localStorage.getItem("section_name"),
                'section_code': data[i].code,
                'section_id':  data[i].id
              });
           }
          }
       });
    }

    $scope.Get_Selected_Lab = function(lab, type) {
      if(type == "delete") {
        $('#delete-lab-modal').openModal();
        localStorage.setItem("section_id", lab.section_id);
      }
    }

    $scope.Move_Randomize = function() {
      if($scope.student_info.length != 0) {
        $rootScope.redirect('/settings_randomize');
      }
    }

    $scope.Get_Student_Id = function(s_id, type){
      student_id = s_id;
      if(type == "delete"){
        $("#delete-modal").openModal();
      }
      if(type == "edit"){
        $("#edit-modal").openModal({
          complete: function(){
            $(".past-data").html("");
          }
        });

        SectionService.Get_Student(student_id)
        .then(function(data) {
          $scope.to_edit_student.push({
            'given_name' : data[0].given_name,
            'middle_name' : data[0].middle_name,
            'last_name':  data[0].last_name,
            'degree':  data[0].degree,
            'classification': data[0].classification,
            'college' : data[0].college
          });
        });

      }
    }

    $scope.Update_Student_Info = function() {
      let gName =  document.querySelector('#student-firstname').value;
      let mName =  document.querySelector('#student-middlename').value;
      let lName =  document.querySelector('#student-lastname').value;
      let sDegree =  document.querySelector('#student-degree').value;
      let sClassification =  document.querySelector('#student-classification').value;
      let sCollege =  document.querySelector('#student-college').value;

      $scope.newStudent.push({
        'given_name' : gName,
        'middle_name' : mName,
        'last_name':  lName,
        'degree':  sDegree,
        'classification': sClassification,
        'college' : sCollege
      });
      SectionService.Update_Student(student_id, $scope.newStudent[0])
      .then(function(data){

        $scope.newStudent.given_name = "";
        $scope.newStudent.middle_name = "";
        $scope.newStudent.last_name = "";
        $scope.newStudent.degree = "";
        $scope.newStudent.classification = "";
        $scope.newStudent.college = "";
      });
      Materialize.toast('Student Successfully Edited!', 3000, 'rounded');
      SectionService.Get_Student_Per_Lab_Section(localStorage.getItem("course_code"), localStorage.getItem("section_name"), localStorage.getItem("section_code"))
        .then(function(data) {
         $scope.student_per_lab = [];
          for(let i = 0 ; i < data.length; i++){
            $scope.student_per_lab.push(data[i]);
          }
       });
    }

    $scope.check_given_name_change_edit = function(){
      let new_name = document.querySelector('#student-firstname').value;
      if (old_student_given_name===new_name) gname=false;
  		else gname = true;
    }

    $scope.check_middle_name_change_edit = function(){
      let new_name = document.querySelector('#student-middlename').value;
      if (old_student_middle_name===new_name) mname=false;
  		else mname = true;
    }

    $scope.check_last_name_change_edit = function(){
      let new_name = document.querySelector('#student-lastname').value;
      if (old_student_last_name===new_name) lname=false;
  		else lname = true;
    }

    $scope.check_degree_change_edit = function(){
      let new_degree = document.querySelector('#student-degree').value;
      if (old_student_degree===new_degree) degree=false;
  		else degree = true;
    }

    $scope.check_classification_change_edit = function(){
      let new_classification = document.querySelector('#student-classification').value;
      if (old_student_classification===new_classification) classification=false;
  		else classification = true;
    }

    $scope.check_college_change_edit = function(){
      let new_college = document.querySelector('#student-college').value;
      if (old_student_college===new_college) college=false;
  		else college = true;
    }

    $scope.check_given_name_change_add = function(){
      let new_name = document.querySelector('#fname-input').value;
      if(new_name===""){
        $("#submit-button-add").addClass("disabled");
        $("#submit-button-add").attr("disabled", "disabled");
        gname_add = false;
      } else{

        gname_add = true;
      }
      if(gname_add && mname_add && lname_add && degree_add && classification_add && college_add && student_number_add){
        $("#submit-button-add").removeClass("disabled");
        $("#submit-button-add").attr("disabled", false);
      } else{
        $("#submit-button-add").addClass("disabled");
        $("#submit-button-add").attr("disabled", "disabled");
      }
    }

    $scope.check_middle_name_change_add = function(){
      let new_name = document.querySelector('#mname-input').value;
      if(new_name===""){
        $("#submit-button-add").addClass("disabled");
        $("#submit-button-add").attr("disabled", "disabled");
        mname_add = false;
      } else{

        mname_add = true;
      }
      if(gname_add && mname_add && lname_add && degree_add && classification_add && college_add && student_number_add){
        $("#submit-button-add").removeClass("disabled");
        $("#submit-button-add").attr("disabled", false);
      } else{
        $("#submit-button-add").addClass("disabled");
        $("#submit-button-add").attr("disabled", "disabled");
      }
    }

    $scope.check_last_name_change_add = function(){
      let new_name = document.querySelector('#lname-input').value;
      if(new_name===""){
        $("#submit-button-add").addClass("disabled");
        $("#submit-button-add").attr("disabled", "disabled");
        lname_add = false;
      } else{

        lname_add = true;
      }
      if(gname_add && mname_add && lname_add && degree_add && classification_add && college_add && student_number_add){
        $("#submit-button-add").removeClass("disabled");
        $("#submit-button-add").attr("disabled", false);
      } else{
        $("#submit-button-add").addClass("disabled");
        $("#submit-button-add").attr("disabled", "disabled");
      }
    }

    $scope.check_degree_change_add = function(){
      let new_degree = document.querySelector('#degree-input').value;
      if(new_degree===""){
        $("#submit-button-add").addClass("disabled");
        $("#submit-button-add").attr("disabled", "disabled");
        degree_add = false;
      } else{

        degree_add = true;
      }
      if(gname_add && mname_add && lname_add && degree_add && classification_add && college_add && student_number_add){
        $("#submit-button-add").removeClass("disabled");
        $("#submit-button-add").attr("disabled", false);
      } else{
        $("#submit-button-add").addClass("disabled");
        $("#submit-button-add").attr("disabled", "disabled");
      }
    }

    $scope.check_classification_change_add = function(){
      let new_classification = document.querySelector('#classification-input').value;
      if(new_classification===""){
        $("#submit-button-add").addClass("disabled");
        $("#submit-button-add").attr("disabled", "disabled");
        classification_add = false;
      } else{
        classification_add = true;
      }
      if(gname_add && mname_add && lname_add && degree_add && classification_add && college_add && student_number_add){
        $("#submit-button-add").removeClass("disabled");
        $("#submit-button-add").attr("disabled", false);
      } else{
        $("#submit-button-add").addClass("disabled");
        $("#submit-button-add").attr("disabled", "disabled");
      }
    }

    $scope.check_student_number_change_add = function(){
      let new_student_number = document.querySelector('#stdnuminput').value;
	  let student_number_regex = new RegExp(/^(([1][9][0-9][0-9])|([2][0-9][0-9][0-9]))\-[0-9]{5}$/);

	  if (new_student_number==="") {
  			if($("#stdnuminput").hasClass('invalid')) {
  				$("#stdnuminput").removeClass('invalid');
  			}
        $("#submit-button-add").addClass("disabled");
        $("#submit-button-add").attr("disabled", "disabled");
        student_number_add = false;
  			return;
  		}

	  if(!(student_number_regex.test(new_student_number))){
	  	$("#snLabel").attr('data-error','Student number format invalid! Use YYYY-NNNNN!');
	  	if(!($("#stdnuminput").hasClass('invalid'))){
	  		$("#stdnuminput").addClass('invalid');
	  	}
	  	return;
	  } else{
      if($("#stdnuminput").hasClass('invalid')) {
        $("#stdnuminput").removeClass('invalid');
      }
    }

      $http.get(
  			         "faculty_user/check_student_number?student_number=" + new_student_number + "&course_id=" + localStorage.getItem("course_id")
  			        ).then(function(response) {
  				        if (response.data) {
					          if(!($("#stdnuminput").hasClass('invalid'))) {
					          	  $("#snLabel").attr('data-error','Student number already used!');
						          $("#stdnuminput").addClass('invalid');
                      $("#submit-button-add").addClass("disabled");
                      $("#submit-button-add").attr("disabled", "disabled");
					          }
  					        student_number_add = false;
          		    } else {
					          if($("#stdnuminput").hasClass('invalid')) {
						          $("#stdnuminput").removeClass('invalid');
					          }
            		    student_number_add = true;
                    if(gname_add && mname_add && lname_add && degree_add && classification_add && college_add && student_number_add){
                      $("#submit-button-add").removeClass("disabled");
                      $("#submit-button-add").attr("disabled", false);
                    } else{
                      $("#submit-button-add").addClass("disabled");
                      $("#submit-button-add").attr("disabled", "disabled");
                    }
          		   }
  			       }
  		       );
    }

    $scope.check_college_change_add = function(){
      let new_college = document.querySelector('#college-input').value;
      if(new_college===""){
        $("#submit-button-add").addClass("disabled");
        $("#submit-button-add").attr("disabled", "disabled");
        college_add = false;
      } else{
        college_add = true;
      }
      if(gname_add && mname_add && lname_add && degree_add && classification_add && college_add && student_number_add){
        $("#submit-button-add").removeClass("disabled");
        $("#submit-button-add").attr("disabled", false);
      } else{
        $("#submit-button-add").addClass("disabled");
        $("#submit-button-add").attr("disabled", "disabled");
      }
    }

    $scope.check_lab_section_name = function(){
      let user_input_lab_section = document.querySelector('#lab-input').value;

      for(let i = 0; i < $scope.lab_sections_info.length; i++){
        if(user_input_lab_section === $scope.lab_sections_info[i].section_code){
          lab_section_name = false;
        }
      }
      if(!lab_section_name){
        Materialize.toast('Lab Section Already Exist!', 3000, 'rounded');
        $("#submit-button").attr('disabled', 'disabled');
        $("#submit-button").addClass('disabled');
      } else{
        if((labSectionRegex.test(user_input_lab_section))){
            $("#submit-button").attr('disabled', false);
            $("#submit-button").removeClass("disabled");
        } else{
            $("#submit-button").attr('disabled', 'disabled');
            $("#submit-button").addClass("disabled");
        }
      }
      lab_section_name = true;
      if(!user_input_lab_section){
        $("#submit-button").attr('disabled', 'disabled');
        $("#submit-button").addClass("disabled");
      }
    }

    $scope.Get_Section_Id = function(c_code, s_name, s_code){
      course_code = c_code;
      section_name = s_name;
      section_code = s_code;
      $('#add-modal').openModal();
    }

    $scope.Add_Student_In_Lab_Section = function(){
      SectionService.Add_Student_In_Lab_Section(course_code, section_name, section_code, $scope.newLabStudent)
      .then(function(data){
        $scope.newLabStudent.given_name = "";
        $scope.newLabStudent.middle_name = "";
        $scope.newLabStudent.last_name = "";
        $scope.newLabStudent.student_number = "";
        $scope.newLabStudent.degree = "";
        $scope.newLabStudent.classification = "";
        $scope.newLabStudent.college = "";
        gname_add = false;
        mname_add = false;
        lname_add = false;
        classification_add = false;
        degree_add = false;
        college_add = false;
        student_number_add = false;
        $('#classification-input').val('');
        $('#classification-input').prop('selectedIndex',0);
        $('#classification-input').material_select();
        $('#college-input').val('');
        $('#college-input').prop('selectedIndex',0);
        $('#college-input').material_select();
        $("#submit-button-add").addClass("disabled");
        $("#submit-button-add").attr("disabled", "disabled");
      });

      SectionService.Get_Student_Per_Lab_Section(localStorage.getItem("course_code"), localStorage.getItem("section_name"), localStorage.getItem("section_code"))
        .then(function(data) {
         $scope.student_per_lab = [];
          for(let i = 0 ; i < data.length; i++){
            $scope.student_per_lab.push(data[i]);
          }
       });

       Materialize.toast('Student Successfully Created!', 3000, 'rounded');
       $('#add-modal').closeModal();
    }

    // http://jsfiddle.net/sturtevant/AZFvQ/
    $scope.Upload_CSV = function(){
      $("#file").change(function(e) {

        let studnumlist = [];

        for(let i = 0; i < $scope.student_info.length; i++){
          studnumlist.push($scope.student_info[i].student_number);
        }

        let ext = $("#file").val().split(".").pop().toLowerCase();

        // CHECKER FOR FILE EXTENSION
        if($.inArray(ext, ['csv']) == -1) {
            Materialize.toast("Only .csv files are allowed", 3000);
            document.getElementById('file').value = '';
            return;
        }

        if (e.target.files != undefined) {
          var reader = new FileReader();

          reader.onload = function(e) {
            let csvval=e.target.result.split("\n");
            let inputrad= [];
            let inputstudnumlist = [];

            for(let j = 0; j < csvval.length; j++){
              let csvvalue=csvval[j].split("\\n");
              for(let i = 0; i<csvvalue.length;i++) {
                let temp = csvvalue[i].split(",");
                inputrad.push(temp);
              }
            }

            let objArray = [];
            for (let i = 1; i < inputrad.length - 1; i++) {
              objArray[i - 1] = {};
              for (let k = 0, y = 0; k < inputrad[0].length && k < inputrad[i].length; k++, y++) {
                let key;
                if(y == 8) y = 0;
                else if(y == 0){
                  key = "student_number";
                  if(inputstudnumlist.indexOf(inputrad[i][k]) == -1){
                    inputstudnumlist.push(inputrad[i][k]);
                  } else {
                    Materialize.toast("Error: Please check the student numbers! (Duplicate student numbers in csv)", 3000);
                    document.getElementById('file').value = '';
                    return;
                  }

                  if(studnumlist.indexOf(inputrad[i][k]) != -1){
                    Materialize.toast("Error: Please check the student numbers! (Already exists in the list)", 3000);
                    document.getElementById('file').value = '';
                    return;
                  }
                } else if(y == 1) {
                  key = "given_name";
                } else if(y == 2) {
                  key = "middle_name";
                } else if(y == 3) {
                  key = "last_name";
                } else if(y == 4) {
                  key = "degree";
                } else if(y == 5) {
                  key = "classification";
                } else if(y == 6) {
                  key = "college";
                } else if(y == 7) {
                  key = "code";
                  if(!labSectionRegex.test(inputrad[i][k])){
                    Materialize.toast("Error: Please check the lab section names!", 3000);
                    document.getElementById('file').value = '';
                    return;
                  }
                }

                objArray[i - 1][key] = inputrad[i][k]
              }
            }

            let json = JSON.stringify(objArray);
            let list_of_students = angular.fromJson(json);
            let arroflab = [];

            for(let i = 0; i < list_of_students.length; i++){
              if(arroflab.indexOf(list_of_students[i].code) == -1){
                arroflab.push(list_of_students[i].code);

                SectionService.Add_Lab_Section(localStorage.getItem('course_code'), localStorage.getItem('section_name'), list_of_students[i])
                .then(function(data) {

                });
              }
            }

            for(let j = 0; j < list_of_students.length; j++){
               SectionService.Add_Student_In_Lab_Section(localStorage.getItem('course_code'), localStorage.getItem('section_name'), list_of_students[j].code, list_of_students[j])
                 .then(function(data){

                 });
                if( j == list_of_students.length - 1){
                  Materialize.toast("Successfully added students in the class list", 3000);
                  $('#file').val('');
                }
             }


             SectionService.Get_Class_List(localStorage.getItem("course_id"), localStorage.getItem("section_name"))
               .then(function(data) {
                 for(let i = 0; i < data.length; i++) {
                   $scope.student_info.push(data[i]);
                 }
                 if(data.length != 0){
                    $('#rand-button').removeClass('disabled');
                    $('#rand-button').attr('disabled', false);
                 }
               });
          }
        };
        	reader.readAsText(e.target.files.item(0));
      });
    }

  }
})();
