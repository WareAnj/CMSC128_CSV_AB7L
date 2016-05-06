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