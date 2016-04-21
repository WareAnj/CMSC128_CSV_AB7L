
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
					Materialize.toast("List is already full", 1000);
					return;
				}

				if(inArray(string, arr)){
					Materialize.toast(string + " is already in the list", 1000);
					return;
				}

				addToTable(string, stringFormatted);			  	  
				
			});
			
			
			$("#rand").click(function(){
				
				if(arr.length == 0){
					alert("The list is empty");
					return false;
				}

				$("#lettersContainer").empty();

			    var name = arr[Math.floor((Math.random() * arr.length))];			    
				var alphabet = "abcdefghijklmnopqrstuvwxyz ".split("");
				var j;

				for(j = 0; j < name.length + (name.length/4); j ++){
					var content = "<span id='lettersContainer" + j + "'></span>";
					$(content).appendTo($("#lettersContainer"));
				}	// add span to html, will contain the letters

				var counter = -1;
				j = 0;
				var loop = setInterval(function(){

					function loopRandomize(){
						$('span#lettersContainer' + counter).html(alphabet[j]);
						if(alphabet[j] == name.charAt(counter)) return;
						j++;
						if(j == 27) j = 0;
					};

					function loopImages(){
			//			$('img#volunteerPic').toggleClass("animated flip");
					}

					setInterval(loopRandomize, 8);	// speed of letters
					setInterval(loopImages, 270);

				    counter++;
				    if(counter === name.length) {	// if all spans are filled
				    	for(j = 0; j < name.length + (name.length/4); j++){
				    		$('span#lettersContainer' + (counter + j)).remove();
				    	}
				        clearInterval(loop);		// it will stop the loop
				    }

				}, 216);	// interval of each loop (each letter)

				/*
					For fillers only
				*/

				var i = 0;
				var counter_fake = -1;
				var loop_fake = setInterval(function(){

					function loopRandomize_fake(){
						$('span#lettersContainer' + counter_fake).html(alphabet[i]);
						i++;
						if(i == 27) i = 0;

					};

					setInterval(loopRandomize_fake, 50);	// speed of letters

				    counter_fake++;
				    if(counter_fake === name.length + 2)	// if all spans are filled
							clearInterval(loop_fake);		// it will stop the loop

				}, 200);	// interval of each loop (each letter)
			});			
			

			$("#clear").click(function(){
				arr = [];
				var deleter = document.getElementsByClassName('fields');
				while(deleter[0]) {
					deleter[0].parentNode.removeChild(deleter[0]);
				}

				Materialize.toast("Cleared all names", 1000);
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
				var spacesToUnderscore = value.replace(/ /g,"_");
				$("#"+ spacesToUnderscore).remove();
				$("#"+ spacesToUnderscore).empty();

				Materialize.toast("Removed " + value + " from the list", 1000);
			};


			function addToTable(string, stringFormatted){
				var delButton = $('<button>not_interested</button>').attr({class:"btn btn-floating waves-effects waves-light material-icons", value:string, onclick:'deleteRow(this.value)'});
				var detTD = $('<td>').append(delButton);

				var spanName = $('<span>').attr({class:"tooltipped", "data-position":"bottom", "data-delay":"50", "data-tooltip":string}).append(stringFormatted);
				var nameTD = $('<td>').append(spanName);

				var spacesToUnderscore = string.replace(/ /g,"_");
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
			document.getElementById('file').onchange = function(){
				console.log("inside file");
				// Check for the various File API support.
				if (window.File && window.FileReader && window.FileList && window.Blob) {
					var file = this.files[0];
					var reader = new FileReader();

					//checking file type
					var ext = $('#file').val().split('.').pop().toLowerCase();
					if($.inArray(ext, ['txt']) == -1) {
					    alert('Only .txt files are allowed');
					    return;
					}

					reader.onload = function(progressEvent){
						var lines = this.result.split('\n');
						var checkerArr = [];

						//first loop for file validation
						for(var line = 0; line < lines.length; line++){

							var string = lines[line].trim();							

							if(lines.length > 10){
								alert("Input file have more than 10 lines");
								return;
							}

							if(!string.match(/^[A-Za-z][A-Za-z\,\.\'\-\s]*$/)){
								alert("Input file contains invalid characters");
								return;
							}

							if(arr.length + lines.length > 10){
								alert("Input file's number of names will exceed the limit");
								return;
							}

							if(inArray(string, checkerArr)){
								alert("Input file contains duplicates");
								return;
							}

							if(inArray(string, arr)){
								alert("Input file contains duplicates with the names in the current list");
								return;
							}

							checkerArr.push(string);
						}

						//second loop for getting the values
						for(var line = 0; line < lines.length; line++){							

							var string = lines[line].trim();
							var stringFormatted = string;
			 				stringFormatted =  stringFormatted.replace(/ /g,"&nbsp;");

							addToTable(string, stringFormatted);

						}
					};
				reader.readAsText(file);
				}
				else {
					alert('The File APIs are not fully supported by your browser.');
				}
			};			
			
		  
