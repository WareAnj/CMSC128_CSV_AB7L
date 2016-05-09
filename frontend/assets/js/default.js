$(".showsidenav").sideNav();

$(document).ready(function(){
  $('.collapsible').collapsible({
    accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });
  $(".showsidenav").sideNav('hide');
});

$(document).ready(function(){
  $("#editButton").on('click', function(){
    $("#editModal").openModal();
  });

  $("#addButton").on('click', function(){
    $("#addModal").openModal();
  });
});

$(document).on('click', '#logout-button', function() {
	$("#profile-setting").remove();

  location.reload();
});
