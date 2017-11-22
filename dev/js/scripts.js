$(document).ready(function(){
  $('.containerPlayer').css('visibility', 'hidden');

  $("body").on("click", ".scroolpage", function(e){
    e.preventDefault();
    $(this).each(function(){
      var  hash= $(this).data("hash");
      $("html, body").delay(500).animate({scrollTop: $('#'+hash).offset().top }, 500);

    });

  });

  $('.containerPlayer').css('display', 'block');

  $("body").on("click", ".containerPlayerClose", function(e){
    $('.containerPlayer').css('visibility', 'hidden');
    $('#ytplayer').attr('src', 'url');
  });


  // Initialize Tooltip
  $('[data-toggle="tooltip"]').tooltip();

  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;  $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
})
