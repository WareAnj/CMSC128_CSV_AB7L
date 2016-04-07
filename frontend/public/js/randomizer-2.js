var name = ("Reginald Neil Recario").toLowerCase();
var alphabet = "abcdefghijklmnopqrstuvwxyz ".split("");
var j = 0;

$('document').ready(function(){
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
