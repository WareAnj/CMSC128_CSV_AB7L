$(".button-collapse").sideNav();

$('.modal-trigger').leanModal({
      dismissible: true,
      opacity: .5,
      in_duration: 300,
      out_duration: 200
    }
  );

$('#submit-button').on('click', function(){
    setTimeout(function(){
      $('#modal1').closeModal();
    }, 3000);
});

$(window).scroll(function(){
    var aTop = $('#reason-1').height();
    if($(this).scrollTop()>=aTop){
    $('#reason-1').removeClass("reason");
        $('#reason-1').addClass("animated fadeInLeft");
    }
});

$(window).scroll(function(){
    var aTop = ($('#reason-1').height() * 2) + 80;
    if($(this).scrollTop()>=aTop){
    $('#reason-2').removeClass("reason");
    $('#reason-2').addClass("animated fadeInRight");
    }
});

$(window).scroll(function(){
    var aTop = ($('#reason-1').height() * 3) + 80;
    if($(this).scrollTop()>=aTop){
    $('#reason-3').removeClass("reason");
        $('#reason-3').addClass("animated fadeInLeft");
    }
});
