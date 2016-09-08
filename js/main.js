$(document).ready(function() {
    $('#content').fullpage({
      fadingEffect: true,
      responsiveHeight: 1,
      afterLoad: function( anchorLink, index){
        if(index == 2){
          $("div.hidden").fadeIn()
        }
      }
    });
});
