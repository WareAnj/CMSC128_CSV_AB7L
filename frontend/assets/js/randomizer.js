var name = ("Reginald Neil Recario").toLowerCase();
var alphabet = "abcdefghijklmnopqrstuvwxyz ".split("");
var j = 0;
var skip = [];


$('document').ready(function(){
	var j;


	for(j = 0; j < name.length; j ++){
		var content = "<span id='lettersContainer" + j + "'></span>";
		$(content).appendTo($("#lettersContainer"));
		skip[j] = 0;
	}	// add span to html, will contain the letters

	var counter = -1;
	j = 0;
	var loop = setInterval(function(){

		function loopRandomize(){
			$('span#lettersContainer' + counter).html(alphabet[j]);
			if(alphabet[j] == name.charAt(counter)){
				skip[counter] = 1;
				return;
			}
			j++;
			if(j == 27) j = 0;
		};

		setInterval(loopRandomize, 7);	// speed of letters

	    counter++;
	    if(counter === name.length) {	
	        clearInterval(loop);		// it will stop the loop
	    }

	}, 189);	// interval of each loop (each letter)
});

	/*
		For fillers only
	*/

	var i = 0;
	var looper = 0;
	var counter_fake = -1;
	var loop_fake = setInterval(function(){

		function loopRandomize_fake(){
			for(looper = -1; looper < name.length; looper++){
				if(skip[looper] == 0){
					i = 1 + Math.floor(Math.random() * 26);
					$('span#lettersContainer' + looper).html(alphabet[i]);
				} 
			}
		};

		setInterval(loopRandomize_fake, 120);	// speed of letters

	    counter_fake++;
	    if(counter_fake === name.length) {	// if all spans are filled
	        clearInterval(loop_fake);		// it will stop the loop
	    }

	}, 300);	// interval of each loop (each letter)