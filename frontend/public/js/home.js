$(".button-sideNav").sideNav();

$(document).ready(function(){
  $('.collapsible').collapsible({
    accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });
});

$('.modal-trigger').leanModal({
      dismissible: true,
      opacity: .5,
      in_duration: 300,
      out_duration: 200
    }
  );

$(window).scroll(function(){
    var aTop = $('#reason-1').height();
    if($(this).scrollTop()>=aTop){
		$('#reason-1').removeClass("reason");
        $('#reason-1').addClass("animated fadeInLeft");
    }
});

$(window).scroll(function(){
    var aTop = $('#reason-2').height() + $('#reason-1').height() + 200;
    if($(this).scrollTop()>=aTop){
		$('#reason-2').removeClass("reason");
		$('#reason-2').addClass("animated fadeInRight");
    }
});

$(window).scroll(function(){
    var aTop = $('#reason-3').height() + $('#reason-2').height() + $('#reason-1').height() + 150;
    if($(this).scrollTop()>=aTop){
		$('#reason-3').removeClass("reason");
        $('#reason-3').addClass("animated fadeInLeft");
    }
});



