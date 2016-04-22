$(".showsidenav").sideNav();

$(document).ready(function(){
  $('.collapsible').collapsible({
    accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });
});

$('.showsidenav').sideNav({
//	menuWidth: 300, // Default is 240
});

$(document).ready(function(){
  $("#addButton").on('click', function(){
    $("#addModal").openModal();
  });
});
