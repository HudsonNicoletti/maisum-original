(function($){

    $(document).ready(function(){

        var $window           = $(window),
            $body             = $("body"),
            $html             = $("html"),
            $htmlbody         = $("html, body"),
            $sliderContainer  = $('section.slider'),
            $slider           = $sliderContainer.find("ul"),
            $header           = $("header"),
            $headerNav        = $header.find("nav"),
            $headerNavUl      = $headerNav.find("ul"),
            $headerNavLi      = $headerNavUl.find("li"),
            $mobileToggle     = $headerNav.find(".menu-toggle"),
            $mobileLogo       = $headerNav.find(".menu-logo"),
            $testimoniesWrap  = $(".testimonies"),
            $testimonies      = $testimoniesWrap.find(".testimony"),
            $percentageWrap   = $(".percentage"),
            $percentage       = $percentageWrap.find("[data-percentage]"),
            $scrollBtn        = $(".scroll-top"),
            $causesWrap       = $(".causes"),
            $partnersWrap     = $(".partners-carousel"),
            $aboutSliderWrap  = $(".about-slider"),
            $tabSet           = $("[data-tab-set]"),
            SliderConfig      = {
                autoPlay : true,
                navigation : false,
                slideSpeed : 300,
                pagination : true,
                paginationSpeed : 400,
                singleItem: true,
                stopOnHover: true,
                addClassActive: false,
                theme: "slider-theme"
            },
            CausesConfig      = {
                autoPlay : true,
                navigation : false,
                slideSpeed : 300,
                pagination : false,
                paginationSpeed : 400,
                itemsCustom : [
                    [0, 1],
                    [320, 1],
                    [640, 2],
                    [960, 3]
              ]
            },
            PartnersConfig    = {
                center  : true,
                loop    : true,
                autoPlay : true,
                navigation : false,
                slideSpeed : 300,
                pagination : false,
                paginationSpeed : 400,
                itemsCustom : [
                    [0, 1],
                    [320, 1],
                    [640, 2],
                    [960, 4]
              ]
            };



            function AjaxForm(form)
            {
              var $this   = $(form),
                  action  = $this.attr("action"),
                  method  = $this.attr("method"),
                  inputs  = $this.find("input:not(:file):not(:submit):not(:checkbox) , textarea, select, input:hidden, input:checked"),
                  files   = $this.find("input:file"),
                  flags   = {},
                  content = new FormData();

              for (var i = 0; i < inputs.length; ++i){
                content.append($(inputs[i]).attr("name"), $(inputs[i]).val()); // Add all fields automatic
              }

              //  Loop & append files with file data
              if (files.length) {
                for (var i = 0; i < files.length; ++i) {
                  if (files[i].files[i] != undefined) {
                    content.append(files.eq(i).attr("name"), files[i].files[i], files[i].files[i].name); // add files if exits
                  }
                }
              }

              $.ajax({
                url: action,
                type: method,
                data: content,
                processData: false,
                contentType: false,
                dataType: "json",
                cache: false,
                success: function (response) {
                  var status = response.status;
                  $("#alert-bar").find("h2").text(response.text);
                  $("#alert-bar").removeClass().addClass(status+" animated slideInUp")
                  .on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    setTimeout(function(){
                      $("#alert-bar").removeClass().addClass(status+" animated slideOutDown")
                      .on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        (response.redirect) ? document.location = response.redirect : null;
                      });
                    },3200);
                  });

                  return false;
                },
                error: function () {
                  $(".alert-bar").find("h2").text(response.text);
                  $(".alert-bar").removeClass().addClass(status+" animated slideInUp")
                  .on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    setTimeout(function(){
                      $(".alert-bar").removeClass().addClass(status+" animated slideOutDown")
                      .on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        (response.redirect) ? document.location = response.redirect : null;
                      });
                    },3200);
                  });
                }
              });

            }

        // tabs function
        $tabSet.each(function(){
          var $tab    = $(this).find("[data-tab]"),
              $indexs = $(this).find("[data-tab-index]");

          $tab.on("click",function(){
            var target  = $(this).data("tab"),
                $content = $indexs.filter("[data-tab-index='"+target+"']");

            $tab.removeClass("active").filter("[data-tab='"+target+"']").addClass("active");
            $indexs.removeClass("active");
            $content.addClass("active");

            if($content.hasClass("active"))
            {
              $htmlbody.animate({
                scrollTop : ($content.offset().top - 60)
              },800);
            }

            return false;
          });
        });

        function fixedHeader( offset )
        {

            if( offset >= ( $header.height() - $headerNav.height() ) )
            {
                $headerNav.css({
                    'position' : 'fixed',
                    'top'      : 0
                });

                $mobileLogo.addClass("active");
            }
            if( offset < ( $header.height() - $headerNav.height() ) )
            {
                $headerNav.css({
                    'position' : 'relative'
                });

                $mobileLogo.removeClass("active");
            }

        }

        function sliderInit()
        {
            var owl = $slider.owlCarousel(SliderConfig);

            return owl;
        }

        function causesInit()
        {
            var owl = $causesWrap.owlCarousel(CausesConfig);

            return owl;
        }

        function partnersInit()
        {
            var owl = $partnersWrap.owlCarousel(PartnersConfig);

            return owl;
        }

        function toggleMenu()
        {
            if( $headerNavUl.hasClass("active") )
            {
                $headerNavUl.removeClass("active").css({
                    'display' : 'none'
                });
            }
            else
            {
                $headerNavUl.addClass("active").css({
                    'display' : 'flex'
                });
            }
        }

        function scrollTopVisibility(offset)
        {

            if( offset > $sliderContainer.height())
            {
                $scrollBtn.css({
                    'opacity' : 1
                });
            }
            if( offset < $sliderContainer.height() )
            {
                $scrollBtn.css({
                    'opacity' : 0
                });
            }
        }

        if($('[data-toggle="tooltip"]').length)
        {
          $('[data-toggle="tooltip"]').tooltip();
        }

        $("input[id*=-8]").on("click",function(){
          var sb = $(this).siblings("input");

          sb.toggleClass("hidden");

        })

        if($("input[id*=-tgl]").length)
        {
          $("input[id*=-tgl]").each(function(){
            var $this = $(this);

            $this.on("click",function(){
              $("input[id*=-tgl]").siblings("input").addClass("hidden");
              $(this).siblings("input").removeClass("hidden");
            });
          });
        }

        $mobileToggle.on("click", function(){
            toggleMenu();
            $mobileToggle.toggleClass("active");
        });

        $scrollBtn.on("click", function(){
            $htmlbody.animate({
                scrollTop : 0
            },800);

            return false;
        });

        $window.scroll(function(){
            var offset = $(window).scrollTop();

            fixedHeader( offset );
            scrollTopVisibility(offset);
        });


        if( $body.hasClass("home") )
        {
            //  google.maps.event.addDomListener(window, 'load', googlemaps() );
            sliderInit();
            causesInit();
            partnersInit();
            $.scrollIt({
                topOffset: -60,
                activeClass: 'active'
            });
        }

        function percentageFill()
        {
          var loop = 0,
          Interval = setInterval(function(){

          loop = loop + 1;
          if( loop <= $percentage.data("percentage") )
          {
            $percentage.removeClass().addClass("c100 big p"+loop)
          }
          else
          {
            clearInterval(Interval);
          }

          }, 060);
        }
        percentageFill();

        if($("[data-account-option]").length)
        {
          var $opt = $("[data-account-option]");
          $opt.each(function(){
            var $this = $(this);

            $this.on("click",function(){
              var opt = $(this).data("account-option");

              $("form[data-option]").filter("[data-option!='"+opt+"']").addClass("hidden");
              $("form[data-option]").filter("[data-option='"+opt+"']").removeClass("hidden");
            });
          });
          $opt.filter("[checked='checked']").trigger("click");
        }

        $("body").delegate("form[role='AjaxForm']", "submit",function(){
          AjaxForm(this);
          return false;
        })

    });

})(jQuery);


(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.6&appId=804353492961247";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

(function(d,s,id){
  var js, fjs = d.getElementsByTagName(s)[0],
      p=/^http:/.test(d.location)?'http':'https';
  if(!d.getElementById(id)){
    js=d.createElement(s);
    js.id=id;
    js.src=p+"://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js,fjs);
  }
})(document,"script","twitter-wjs");
