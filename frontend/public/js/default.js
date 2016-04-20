$(".showsidenav").sideNav();

$(document).ready(function(){
  $('.collapsible').collapsible({
    accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });
});

$('.showsidenav').sideNav({
	menuWidth: 350, // Default is 240
});