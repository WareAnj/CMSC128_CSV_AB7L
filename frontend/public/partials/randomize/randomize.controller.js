(function() {
  'use strict';

  angular
    .module('app')
    .controller('RandomCtrl', RandomCtrl);

  RandomCtrl.$inject = ["$scope", "$location", "RandomService"];

  function RandomCtrl($scope, $location, RandomService) {
    $scope.students = [];
    var randdata = {};

    $scope.Randomize = function() {	   
      
      if($scope.counts == null){
        alert("Please Pick Values");
        return;
      }

      //1L
      randdata = {
		"user_id":"1", 
		"course_code":"CMSC 128", 
		"section_name":"AB",
		"section_code":"1L",
		"limit":$scope.counts.onel
	  };

	  
      RandomService.Randomize(randdata)
      .then(function(data) {
      	for(var i = 0; i < data.length; i++)
         	$scope.students.push(data[i]);

      });

      
      //2L
      randdata = {
			"user_id":"1", 
			"course_code":"CMSC 128", 
			"section_name":"AB",
			"section_code":"2L",
			"limit":$scope.counts.twol
		};

      RandomService.Randomize(randdata)
      .then(function(data) { 
      	for(var i = 0; i < data.length; i++)
         	$scope.students.push(data[i]);
      });

      //3L
      randdata = {
			"user_id":"1", 
			"course_code":"CMSC 128", 
			"section_name":"AB",
			"section_code":"3L",
			"limit":$scope.counts.threel
		};

      RandomService.Randomize(randdata)
      .then(function(data) {         
      	for(var i = 0; i < data.length; i++)
         	$scope.students.push(data[i]);
      });

      //4L
      randdata = {
			"user_id":"1", 
			"course_code":"CMSC 128", 
			"section_name":"AB",
			"section_code":"4L",
			"limit":$scope.counts.fourl
		};

      RandomService.Randomize(randdata)
      .then(function(data) {      	
      	for(var i = 0; i < data.length; i++)
         	$scope.students.push(data[i]);
      });

      //5L
      randdata = {
			"user_id":"1", 
			"course_code":"CMSC 128", 
			"section_name":"AB",
			"section_code":"5L",
			"limit":$scope.counts.fivel
		};

      RandomService.Randomize(randdata)
      .then(function(data) {
      	for(var i = 0; i < data.length; i++)
         	$scope.students.push(data[i]);
      });

      //6L
      randdata = {
			"user_id":"1", 
			"course_code":"CMSC 128", 
			"section_name":"AB",
			"section_code":"6L",
			"limit":$scope.counts.sixl
		};

      RandomService.Randomize(randdata)
      .then(function(data) {
      	for(var i = 0; i < data.length; i++)
         	$scope.students.push(data[i]);
      });

      //7L
      randdata = {
			"user_id":"1", 
			"course_code":"CMSC 128", 
			"section_name":"AB",
			"section_code":"7L",
			"limit":$scope.counts.sevenl
		};

      RandomService.Randomize(randdata)
      .then(function(data) {
      	for(var i = 0; i < data.length; i++)
         	$scope.students.push(data[i]);
      });      
      
      console.log($scope.students);

    }
  }
})();
