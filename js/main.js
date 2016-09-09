$(document).ready(function() {
    $('#content').fullpage({
      responsiveHeight: 1,
      afterLoad: (anchorLink, index)=>{
        if(index == 2){
          $('.introduction .card').fadeIn().toggleClass("hidden")
          setTimeout(()=>{
            $('.tech-skill p').after(
            '<div class="techStack col s12"></div>'
            );
            var delay=0;
            introduction.technology.map((item)=>{
              var content = '<div class="col s3 hidden '+item[1]+'"><img src="images/introduction/'+ item[1] +'.png" /><p>'+ item[0] +'</p></div>';
              setTimeout(()=>{$('.techStack').append(content);
              hideElement("."+item[1])},delay+=100)
            })
          },300)
        }
        else if (index == 3){
          hideElement("div.project")
        }
      },
      onLeave: (index, nextIndex, direction)=>{
        if(index == 2){
          $('.introduction .card').fadeOut().toggleClass("hidden")
          $('.techStack').fadeOut().remove();
        } else if (index == 3){
          $('.project .card').fadeIn().toggleClass("hidden")
        }
      }
    });

    $('.title').textillate();

});

var hideElement = (tag)=>{
  if($(tag).hasClass("hidden")){
    $(tag).fadeIn().toggleClass("hidden")
  } else {
    $(tag).fadeOut().toggleClass("hidden")
  }
}
