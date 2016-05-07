$(document).ready(function(){
	$('ul.tabs').tabs();
});

function displayProfile() {
	var cssf = document.getElementById("cprofile-input").value + ".css";
	
	if(document.getElementById("profile-setting")){
		if(cssf != "default.css") $('#profile-setting').replaceWith("<link id='profile-setting' type='text/css' rel='stylesheet' href='../assets/stylesheets/"+ cssf + "'>");
		else $('#profile-setting').remove();
	}

	else{
		$("head").append("<link id='profile-setting' type='text/css' rel='stylesheet' href='../assets/stylesheets/"+ cssf + "'>");
	}
};