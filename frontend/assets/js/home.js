$(document).ready(function(){
	$('ul.tabs').tabs();
});

/*$(document).ready(function(){
    function get_file(){
    	var cssf = $("#cssfile").html();
        $("head").append("<link id='profile-setting' type='text/css' rel='stylesheet' href='../assets/stylesheets/"+ cssf + "'>");
    };

	setTimeout(get_file, 300);
});*/

function displayProfile() {
	var cssf = document.getElementById("profile-input").value + ".css";
	
	if(document.getElementById("profile-setting")){
		if(cssf != "default.css") $('#profile-setting').replaceWith("<link id='profile-setting' type='text/css' rel='stylesheet' href='../assets/stylesheets/"+ cssf + "'>");
		else $('#profile-setting').remove();
	}

	else{
		$("head").append("<link id='profile-setting' type='text/css' rel='stylesheet' href='../assets/stylesheets/"+ cssf + "'>");
	}
};