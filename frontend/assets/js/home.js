$(document).ready(function(){
	$('ul.tabs').tabs();
});

$(document).ready(function(){
    function get_file(){
    	var cssf = $("#cssfile").html();
        $("head").append("<link id='profile' type='text/css' rel='stylesheet' href='../assets/stylesheets/"+ cssf + "'>");
    };

	setTimeout(get_file, 300);
});

function displayProfile() {
	var cssf = document.getElementById("profile-input").value + ".css";
	
	if(document.getElementById("profile")){
		if(cssf != "default.css") $('#profile').replaceWith("<link id='profile' type='text/css' rel='stylesheet' href='../assets/stylesheets/"+ cssf + "'>");
		else $('#profile').remove();
	}

	else{
		$("head").append("<link id='profile' type='text/css' rel='stylesheet' href='../assets/stylesheets/"+ cssf + "'>");
	}
};