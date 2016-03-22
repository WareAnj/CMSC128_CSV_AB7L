$(".button-collapse").sideNav();

$('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
    }
  );

$(window).scroll(function(){
    var aTop = $('#reason-1').height();
    if($(this).scrollTop()>=aTop){
        $('#reason-1').fadeIn(slow);/*animate({
        	opacity: 1,
            left: '250px'
        });*/
    }
});