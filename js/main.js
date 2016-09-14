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
          $(".project-view").on("click","div", function(){createProjectsDetailView($(this).attr("class"))});
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

    $(".home .title").textillate();
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
    var content = '<div class="col s4 m2 transperant '+item[1]+'"><img src="images/introduction/'+ item[1] +'.png" /><p>'+ item[0] +'</p></div>';
    $('.techStack').append(content);
    setTimeout(()=>{hideElement("."+item[1])},delay+=100);
  })
}

var createProjectsView = ()=>{
  $(".projects .card-content").append('<figure class="project-view"></figure>');
  $(".projects .card").fadeIn().toggleClass("hidden");
  var cssLeft = -5, cssZIndex = projects.length;
  projects.map((project)=>{
    var name = project.name.toLowerCase().replace(" ","-");
    $(".projects .project-view").append('<div class="'+ name +'"><img src="images/projects/'+ project.imgurl +'.JPG" /><h3 class="hidden">'+ project.name +'</h3></div>');
    $("."+name).css({"left":cssLeft+"vw","z-index":cssZIndex});
    cssLeft += 20;
    cssZIndex--;
  })
}

var createProjectsDetailView = (imgClass)=>{
    $(".project-view").fadeOut();
    setTimeout(()=>{$(".project-view").remove()},1100);
    $(".projects .card-content").append('<div class="project-detail hidden"></div>');
    $(".project-detail").append('<ul class="tabs"></ul>')
    setTimeout(()=>{$(".project-detail").fadeIn().toggleClass("hidden");$('.project-detail .tabs').tabs('select_tab', imgClass);},400);
    projects.map((project)=>{
      var name = project.name.toLowerCase().replace(" ","-");
      $(".project-detail .tabs").append('<li class="tab col s'+(12/projects.length)+'"><a class="'+ (name == imgClass? "active": "") +'" href="#'+ name +'">'+ project.name +'</li>')
      $(".project-detail .tabs").after('<div id="'+ name +'" class="col s12"></div>')
      $("#"+name).append('<figure class="col s6"><img src="images/projects/'+ project.imgurl +'.JPG"</figure>').append('<article class="information col s6"><div class="title"><h4>'+ project.name +'</h4><a class="website" href="'+ project.url +'" target="_blank"><i class="fa fa-external-link-square fa-3x"><p class="hidden">Link To App</p></i></a><a class="github" href="'+ project.github +'" target="_blank"><i class="fa fa-github fa-3x"><p class="hidden">Link To GitHub</p></i></a></div><p>'+ project.description +'</p><ul class="highlight"></ul><p class="techstack">Technologies: <br /></p></article>');
      project.highlight.map((list)=>{
        $("#"+ name +"  .highlight").append('<li>'+list+'</li>')
      });
      project.technologies.map((tech)=>{
        $("#"+ name +" .techstack").append('<figure class="col s2"><img src="images/introduction/'+ tech[1] +'.png" /><p>'+ tech[0] +'</p></figure>')
      })
    })
    $('.project-detail .tabs').tabs();
  }
