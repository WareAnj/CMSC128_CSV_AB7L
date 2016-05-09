(function() {
  'use strict';

  angular
    .module('app')
    .controller('SectionCtrl', SectionCtrl);

  SectionCtrl.$inject = ["$scope", "$location", "$http", "SectionService", "$route", "$filter"];

  function SectionCtrl($scope, $location, $http, SectionService, $route, $filter) {
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
       SectionService.Get_Lab_Sections(localStorage.getItem("course_id"), localStorage.getItem("section_name"))
         .then(function(data) {
          $scope.lab_sections_info = [];
           for(var i = 0 ; i < data.length; i++){
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
        });

        SectionService.Get_Lab_Sections(localStorage.getItem("course_id"), localStorage.getItem("section_name"))
          .then(function(data) {
           $scope.lab_sections_info = [];
            for(var i = 0 ; i < data.length; i++){
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
           for(var i = 0 ; i < data.length; i++){
             $scope.student_per_lab.push(data[i]);
           }
        });
     }

    $scope.Get_Class_List = function() {
      SectionService.Get_Class_List(localStorage.getItem("course_id"), localStorage.getItem("section_name"))
        .then(function(data) {
          for(let i = 0; i < data.length; i++) {
            $scope.student_info.push(data[i]);
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
      var orderBy = $filter('orderBy');
      $scope.predicate = predicate;
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.student_info = orderBy($scope.student_info, predicate, $scope.reverse);
    };

    $scope.order_lab = function(predicate) {
      var orderBy = $filter('orderBy');
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
          for(var i = 0 ; i < data.length; i++){
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
          for(var i = 0 ; i < data.length; i++){
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
          for(var i = 0 ; i < data.length; i++){
            $scope.student_per_lab.push(data[i]);
          }
       });
    }

    $scope.check_given_name_change_edit = function(){
      var new_name = document.querySelector('#student-firstname').value;
      if (old_student_given_name===new_name) gname=false;
  		else gname = true;
    }

    $scope.check_middle_name_change_edit = function(){
      var new_name = document.querySelector('#student-middlename').value;
      if (old_student_middle_name===new_name) mname=false;
  		else mname = true;
    }

    $scope.check_last_name_change_edit = function(){
      var new_name = document.querySelector('#student-lastname').value;
      if (old_student_last_name===new_name) lname=false;
  		else lname = true;
    }

    $scope.check_degree_change_edit = function(){
      var new_degree = document.querySelector('#student-degree').value;
      if (old_student_degree===new_degree) degree=false;
  		else degree = true;
    }

    $scope.check_classification_change_edit = function(){
      var new_classification = document.querySelector('#student-classification').value;
      if (old_student_classification===new_classification) classification=false;
  		else classification = true;
    }

    $scope.check_college_change_edit = function(){
      var new_college = document.querySelector('#student-college').value;
      if (old_student_college===new_college) college=false;
  		else college = true;
    }

    $scope.check_given_name_change_add = function(){
      var new_name = document.querySelector('#fname-input').value;
      if(new_name===""){
        $("#submit-button-add").addClass("disabled");
        gname_add = false;
      } else{

        gname_add = true;
      }
      if(gname_add && mname_add && lname_add && degree_add && classification_add && college_add && student_number_add){
        $("#submit-button-add").removeClass("disabled");
      } else{
        $("#submit-button-add").addClass("disabled");
      }
    }

    $scope.check_middle_name_change_add = function(){
      var new_name = document.querySelector('#mname-input').value;
      if(new_name===""){
        $("#submit-button-add").addClass("disabled");
        mname_add = false;
      } else{

        mname_add = true;
      }
      if(gname_add && mname_add && lname_add && degree_add && classification_add && college_add && student_number_add){
        $("#submit-button-add").removeClass("disabled");
      } else{
        $("#submit-button-add").addClass("disabled");
      }
    }

    $scope.check_last_name_change_add = function(){
      var new_name = document.querySelector('#lname-input').value;
      if(new_name===""){
        $("#submit-button-add").addClass("disabled");
        lname_add = false;
      } else{

        lname_add = true;
      }
      if(gname_add && mname_add && lname_add && degree_add && classification_add && college_add && student_number_add){
        $("#submit-button-add").removeClass("disabled");
      } else{
        $("#submit-button-add").addClass("disabled");
      }
    }

    $scope.check_degree_change_add = function(){
      var new_degree = document.querySelector('#degree-input').value;
      if(new_degree===""){
        $("#submit-button-add").addClass("disabled");
        degree_add = false;
      } else{

        degree_add = true;
      }
      if(gname_add && mname_add && lname_add && degree_add && classification_add && college_add && student_number_add){
        $("#submit-button-add").removeClass("disabled");
      } else{
        $("#submit-button-add").addClass("disabled");
      }
    }

    $scope.check_classification_change_add = function(){
      var new_classification = document.querySelector('#classification-input').value;
      if(new_classification===""){
        $("#submit-button-add").addClass("disabled");
        classification_add = false;
      } else{
        classification_add = true;
      }
      if(gname_add && mname_add && lname_add && degree_add && classification_add && college_add && student_number_add){
        $("#submit-button-add").removeClass("disabled");
      } else{
        $("#submit-button-add").addClass("disabled");
      }
    }

    $scope.check_student_number_change_add = function(){
      var new_student_number = document.querySelector('#stdnuminput').value;

      if (new_student_number==="") {
  			if($("#stdnuminput").hasClass('invalid')) {
  				$("#stdnuminput").removeClass('invalid');
  			}
        $("#submit-button-add").addClass("disabled");
        student_number_add = false;
  			return;
  		}

      $http.get(
  			         "faculty_user/check_student_number?student_number=" + new_student_number + "&course_id=" + localStorage.getItem("course_id")
  			        ).then(function(response) {
  				        if (response.data) {
					          if(!($("#stdnuminput").hasClass('invalid'))) {
						          $("#stdnuminput").addClass('invalid');
                      $("#submit-button-add").addClass("disabled");
					          }
  					        student_number_add = false;
          		    } else {
					          if($("#stdnuminput").hasClass('invalid')) {
						          $("#stdnuminput").removeClass('invalid');
					          }
            		    student_number_add = true;
                    if(gname_add && mname_add && lname_add && degree_add && classification_add && college_add && student_number_add){
                      $("#submit-button-add").removeClass("disabled");
                    } else{
                      $("#submit-button-add").addClass("disabled");
                    }
          		   }
  			       }
  		       );
    }

    $scope.check_college_change_add = function(){
      var new_college = document.querySelector('#college-input').value;
      if(new_college===""){
        $("#submit-button-add").addClass("disabled");
        college_add = false;
      } else{
        college_add = true;
      }
      if(gname_add && mname_add && lname_add && degree_add && classification_add && college_add && student_number_add){
        $("#submit-button-add").removeClass("disabled");
      } else{
        $("#submit-button-add").addClass("disabled");
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
        $("#submit-button").addClass("disabled");
      } else{
        if((labSectionRegex.test(user_input_lab_section))){
            $("#submit-button").removeClass("disabled");
        } else{
            $("#submit-button").addClass("disabled");
        }
      }
      lab_section_name = true;
      if(!user_input_lab_section){
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
      });

      SectionService.Get_Student_Per_Lab_Section(localStorage.getItem("course_code"), localStorage.getItem("section_name"), localStorage.getItem("section_code"))
        .then(function(data) {
         $scope.student_per_lab = [];
          for(var i = 0 ; i < data.length; i++){
            $scope.student_per_lab.push(data[i]);
          }
       });
       Materialize.toast('Student Successfully Created!', 3000, 'rounded');
       $('#add-modal').closeModal();
    }
  }
})();
