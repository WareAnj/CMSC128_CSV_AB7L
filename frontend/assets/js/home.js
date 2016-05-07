$(document).ready(function(){
	$('ul.tabs').tabs();
});

$(document).ready(function(){
    function get_file(){
    	var cssf = $("#cssfile").html();
        $("head").append("<link id='profile-setting' type='text/css' rel='stylesheet' href='../assets/stylesheets/"+ cssf + "'>");
		$("#current_color").html((cssf.charAt(0).toUpperCase() + cssf.slice(1)).slice(0,cssf.length - 4));
    };

	setTimeout(get_file, 300);
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
