$(document).ready(function(){


  $("body").on("click", ".scroolpage", function(e){
    e.preventDefault();
    $(this).each(function(){
      var  hash= $(this).data("hash");
      $("html, body").delay(500).animate({scrollTop: $('#'+hash).offset().top }, 500);

    });

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
