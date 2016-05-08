$(document).ready(function(){
	$('ul.tabs').tabs();
});

function displayProfile() {
	var cssf = document.getElementById("cprofile-input").value;

	if(document.getElementById("profile-setting")){
		if(cssf=== "default.css") $('#profile-setting').remove();
		else $('#profile-setting').replaceWith("<link id='profile-setting' type='text/css' rel='stylesheet' href='../assets/stylesheets/"+ cssf + "'>");
	}

	else{
		if(cssf!=='default.css')
			$("head").append("<link id='profile-setting' type='text/css' rel='stylesheet' href='../assets/stylesheets/"+ cssf + "'>");
	}
};
