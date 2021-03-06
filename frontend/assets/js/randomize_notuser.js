		  //randomize and add name
		  var arr = [];		  	
		  
		  	$("#add").click(function(){		  			  
			 	var string = document.getElementById('input').value.trim();
			 	var stringFormatted = string;
			 	stringFormatted =  stringFormatted.replace(/ /g,"&nbsp;")

				if(!string.match(/^[A-Za-z][A-Za-z\,\.\'\-\s]*$/)){
					$('#add').attr('disabled', true);
					return;
				}

				if(arr.length == 10){
					Materialize.toast("List is already full", 3000);
					return;
				}

				if(inArray(string, arr)){
					Materialize.toast(string + " is already in the list", 3000);
					return;
				}

				addToTable(string, stringFormatted);			  	  
				
			});
			
			
			function Randomize(){
				if(arr.length == 0){
					return 1;
				}

				$("#lettersContainer").empty();

			    var name = (arr[Math.floor((Math.random() * arr.length))]).toLowerCase();			    
				var alphabet_fake = "abcdefgh mn prs uv   z ".split("");
				var j;
				var skip = [];


				for(j = 0; j < name.length; j ++){
					var content = "<span id='lettersContainer" + j + "'></span>";
					$(content).appendTo($("#lettersContainer"));
					skip[j] = 0;
				}	// add span to html, will contain the letters

				var counter = 0;
				var place;
				var loop = setInterval(function(){
					do{
						place = Math.floor(Math.random() * name.length);
					}while(skip[place]);
					
					$('span#lettersContainer' + place).html(name.charAt(place));
					skip[place] = 1;
					counter += 1;
					if(counter == name.length) clearInterval(loop);
				}, 150);	// interval of each loop (each letter)
			
				var i = 0;
				var looper = 0;
				var fake_loop = setInterval(function(){

					function loopRandomize_fake(){
						for(looper = -1; looper < name.length; looper++){
							if(skip[looper] == 0){
								i = 1 + Math.floor(Math.random() * 26);
								$('span#lettersContainer' + looper).html(alphabet_fake[i]);
							}
						}
					};

					setInterval(loopRandomize_fake, 100);	// speed of letters

				}, 500);	// interval of each loop (each letter)
			};			
			

			$("#clear").click(function(){
				var checker = confirm("Are you sure you want to clear all names?");

				if(!checker)
					return;

				arr = [];
				document.getElementById('file').value = "";
				document.getElementById('text-file-area').value = "";
				document.getElementById('input').value = "";
				var deleter = document.getElementsByClassName('fields');
				while(deleter[0]) {
					deleter[0].parentNode.removeChild(deleter[0]);
				}

				Materialize.toast("Cleared all fields", 1000);
			});
			
			function inArray(word,array){
    			var count=array.length;
   				for(var i=0;i<count;i++){
        			if(array[i].toLowerCase()===word.toLowerCase()){return true;}
    			}
    			return false;
			}
			
			
			function deleteRow(value){
				var index = arr.indexOf(value);
				arr.splice(index,1);
				var spacesToUnderscore = value.replace(/ /g,"_").replace(/\./g,"");
				$("#"+ spacesToUnderscore).remove();
				$("#"+ spacesToUnderscore).empty();

				Materialize.toast("Removed " + value + " from the list", 1000);
			};



			function addToTable(string, stringFormatted){
				var delButton = $('<button>delete</button>').attr({class:" trash btn btn-floating waves-effects waves-light material-icons red lighten-1", value:string, onclick:'deleteRow(this.value)'});
				var detTD = $('<td class="shrink">').append(delButton);

				var spanName = $('<span>').attr({class:"tooltipped", "data-position":"bottom", "data-delay":"50", "data-tooltip":string}).append(stringFormatted);
				var nameTD = $('<td class="expand">').append(spanName);

				var spacesToUnderscore = string.replace(/ /g,"_").replace(/\./g,"");
				var new_field = $('<tr>').attr({class:'fields', id:spacesToUnderscore}).append(nameTD).append(detTD);		  
				
				$("#table").append(new_field);
				arr.push(string);

				document.getElementById('input').value = '';					
				
				Materialize.toast("Successfully Added " + string, 1000);

				$('#add').attr('disabled', true);

				$('.tooltipped').tooltip({delay: 50});
			};

			/*
				src: http://www.html5rocks.com/en/tutorials/file/dndfiles/
				src: http://www.htmlgoodies.com/beyond/javascript/read-text-files-using-the-javascript-filereader.html#fbid=jkQONyBE0Ht				
				
			*/
			//filereading
		  	$("#file").click(function(){
				document.getElementById('file').value = '';
			});

			document.getElementById('file').onchange = function(){
				// Check for the various File API support.
				if (window.File && window.FileReader && window.FileList && window.Blob) {
					var file = this.files[0];
					var reader = new FileReader();

					if ($("#file").val() == "") {
				        return;
				    }

					//checking file type
					var ext = $('#file').val().split('.').pop().toLowerCase();
					if($.inArray(ext, ['csv']) == -1) {
					    Materialize.toast("Only .csv files are allowed", 3000);
					    return;
					}

					reader.onload = function(progressEvent){
						var checkerArr = [];

						var lines = this.result.split('\n');
						var numlines = lines.length;

						//first loop for file validation
						for(var line = 0; line < numlines; line++){

							var string = lines[line].trim();

							if(numlines > 10){
								Materialize.toast("Input file has more than 10 lines", 3000);
								return;
							}

							if(!string.match(/^[A-Za-z][A-Za-z\,\.\'\-\s]*$/)){
								Materialize.toast("Input file contains invalid characters", 3000);
								return;
							}

							if(arr.length + numlines > 10){
								Materialize.toast("Input file's number of names will exceed the limit", 3000);
								return;
							}

							if(inArray(string, checkerArr)){
								Materialize.toast("Input file has duplicates", 3000);
								return;
							}

							if(inArray(string, arr)){
								Materialize.toast("Input file has duplicates with the names in the list", 3000);
								return;
							}

							checkerArr.push(string);
						}

						//second loop for getting the values
						for(var line = 0; line < numlines; line++){							

							var string = lines[line].trim();
							var stringFormatted = string;
			 				stringFormatted =  stringFormatted.replace(/ /g,"&nbsp;");

							addToTable(string, stringFormatted);

						}

					};
				reader.readAsText(file);
				}
				else {
					Materialize.toast("The File APIs are not fully supported by your browser", 3000);
				}
			};			
			
		  $("#closeModal").click(function(){
		  	  $('#help-file').closeModal();
		  });

		  $("#closeModal1").click(function(){
		  	  $('#modal1').closeModal();
		  });

		  $(document).ready(function(){
    			$('.tooltipped').tooltip({delay: 50});
  		  });