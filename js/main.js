$(document).ready(function() {
    // preload(
    // introduction.technology.forEach((item)=>{var list = "images/introduction/"+ item[1] +".png"})
    // )
    $('#content').fullpage({
      responsiveHeight: 1,
      afterLoad: (anchorLink, index)=>{
        if(index == 2){
          createTechstackSection();
        }
        else if (index == 3){
          createProjectsView();
          $(".project-view").on("click","img", function(){createProjectsDetailView($(this).attr("class"))});
        }
      },
      onLeave: (index, nextIndex, direction)=>{
        if(index == 2){
          $(".introduction .card").fadeOut().toggleClass("hidden")
          $(".techStack").fadeOut().remove();
        } else if (index == 3){
          $(".projects .card").fadeOut().toggleClass("hidden")
          $(".project-view").fadeOut().remove();
          $(".project-detail").fadeOut().remove();
        }
      }
    });

    $(".title").textillate();
});

//preload images
var images = [];
var preload = function() {
				for (i = 0; i < preload.arguments.length; i++) {
					images[i] = new Image()
					images[i].src = preload.arguments[i]
          console.log(preload.arguments[i])
          // console.log("loaded"+ images[i].src)
				}
			}

var hiddenElement = (tag)=>{
  if($(tag).hasClass("hidden")){
    $(tag).fadeIn().toggleClass("hidden")
  } else {
    $(tag).fadeOut().toggleClass("hidden")
  }
}

var hideElement = (tag)=>{
  if($(tag).hasClass("transperant")){
    $(tag).toggleClass("fade-in")
    setTimeout(()=>{
      $(tag).toggleClass("transperant fade-in")
    },2000)
  } else {
    $(tag).toggleClass("fade-in")
  }
}

var createTechstackSection = ()=>{
  $(".tech-skill p").after(
  '<div class="techStack col s12"></div>'
  );
  $(".introduction .card").fadeIn().toggleClass("hidden");
  var delay=0;
  introduction.technology.map((item)=>{
    var content = '<div class="col s3 transperant '+item[1]+'"><img src="images/introduction/'+ item[1] +'.png" /><p>'+ item[0] +'</p></div>';
    $('.techStack').append(content);
    setTimeout(()=>{hideElement("."+item[1])},delay+=100);
  })
}

var createProjectsView = ()=>{
  $(".projects .card-content").append('<figure class="project-view"></figure>');
  $(".projects .card").fadeIn().toggleClass("hidden");
  var cssLeft = 0, cssZIndex = projects.length;
  projects.map((project)=>{
    var name = project.name.toLowerCase().replace(" ","-");
    $(".projects .project-view").append('<img class="'+ name +'" src="'+ project.url +'" />');
    $("."+name).css({"left":cssLeft+"vw","z-index":cssZIndex});
    cssLeft += 15;
    cssZIndex--;
  })
}

var createProjectsDetailView = (imgClass)=>{
    $(".project-view").fadeOut();
    setTimeout(()=>{$(".project-view").remove()},1100);
    $(".projects .card-content").append('<div class="project-detail hidden"></div>');
    $(".project-detail").append('<ul class="tabs"></ul>')
    setTimeout(()=>{$(".project-detail").fadeIn().toggleClass("hidden");},400);
    projects.map((project)=>{
      var name = project.name.toLowerCase().replace(" ","-");
      $(".project-detail .tabs").append('<li class="tab col s'+(12/projects.length)+'"><a class="'+ (name == imgClass? "active": "") +'" href="#'+ name +'">'+ project.name +'</li>')
      $(".project-detail .tabs").after('<div id="'+ name +'" class="col s12"></div>')
      $("#"+name).append('<figure class="col s6"><img src="'+ project.url +'"</figure>').append('<article class="col s6"><h4>'+ project.name +'</h4></article>')
    })
    $('.project-detail .tabs').tabs()
    // $('.project-detail .tabs').tabs('select_tab', imgClass);
  }
