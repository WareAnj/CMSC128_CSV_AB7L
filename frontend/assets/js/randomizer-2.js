		$('.showsidenav').sideNav({
			menuWidth: 350, // Default is 240
		});
		$(document).ready(function(){
			$('ul.tabs').tabs();
		});
		function removeDiv(divId) {
			$("#"+divId).remove();
		}