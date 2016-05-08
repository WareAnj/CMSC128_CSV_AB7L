'use strict';

(function() {
	angular
		.module("app")
		.factory("SectionService", SectionService);

	SectionService.$inject = ["$http", "$q"];

	function SectionService($http, $q) {
		let service = {};
		service.Get_Lab_Sections = Get_Lab_Sections;
		service.Add_Lab_Section = Add_Lab_Section;
		service.Get_Class_List = Get_Class_List;
		service.Get_Student = Get_Student;
		service.Get_Student_Per_Lab_Section = Get_Student_Per_Lab_Section;
		service.Delete_Student = Delete_Student;
		service.Update_Student = Update_Student;
		return service;

		function Get_Lab_Sections(course_id, name){
			var deferred = $q.defer();

			$http.get("/course/lecture/get_lab_sections?name=" + name + "&course_id=" + course_id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Get Lab Sections");
			});

			return deferred.promise;
		}

		function Add_Lab_Section(course_code, section_name, section_code){
			var deferred = $q.defer();

			$http.post("/section/post_sub_section?course_code=" + course_code + "&name=" + section_name, section_code)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Add Lab Section");
			});

			return deferred.promise;
		}

		function Get_Student_Per_Lab_Section(course_code, name, section_code){
			var deferred = $q.defer();

			$http.get("/course/lecture/get_student_per_lab_section?course_code=" + course_code + "&name=" + name + "&section_code=" + section_code)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Students per Lab Sections");
			});

			return deferred.promise;
		}

		function Get_Class_List(course_id, name) {
			let deferred = $q.defer();

			$http.get("course/lecture/get_class_list?course_id=" + course_id + "&name=" + name)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Get Lecture Class List");
			});

			return deferred.promise;
		}

		function Get_Student(id) {
			let deferred = $q.defer();

			$http.get("course/lecture/get_student?id=" + id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Get Student");
			});

			return deferred.promise;
		}

		function Delete_Student(id){
			let deferred = $q.defer();

			$http.delete("course/lecture/delete_student_in_lab_section?id=" + id)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Delete Student");
			});

			return deferred.promise;
		}

		function Update_Student(id, newStudent){
			let deferred = $q.defer();

			$http.put("course/lecture/update_student_in_lab_section?id=" + id, newStudent)
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(data) {
				deferred.reject("Error: Cannot Update Student");
			});

			return deferred.promise;
		}
	}
})();
