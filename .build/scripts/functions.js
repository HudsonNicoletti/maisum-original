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
            $tabsWrap         = $(".tabs"),
            $tabsIndexes      = $tabsWrap.find("ul.indexes li"),
            $tabsTargets      = $tabsWrap.find("ul.targets li"),
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
            TestimonyConfig   = {
                autoPlay : true,
                navigation : false,
                slideSpeed : 300,
                pagination : false,
                paginationSpeed : 400,
                singleItem: true,
                stopOnHover: false,
                addClassActive: false,
                autoHeight: true
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
            },
            aboutSliderConfig = {
                autoPlay : true,
                navigation : false,
                slideSpeed : 300,
                pagination : true,
                paginationSpeed : 400,
                singleItem: true,
                stopOnHover: false,
                addClassActive: false,
                theme: "about-us-owl"
            };
        
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
        
        function googlemaps()
        {   
            var coords = [
                { title: "Ge' Adore" , phone: "43 3377.1600" , lat: -23.3178821, lng: -51.1645811 }
            ];

            var map = new google.maps.Map(document.getElementById('googleMap'),{
                center: { lat: -23.3178821, lng: -51.1645811 },
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControlOptions: {
		    	style: google.maps.ZoomControlStyle.LARGE,
		    },
                scrollwheel: false,
                draggable: false,
                zoom: 18
            });

            for(var i = 0; i < coords.length; i++ )
            {

                var infoWindow = new google.maps.InfoWindow(),
                    position   = new google.maps.LatLng(coords[i].lat, coords[i].lng),
                    marker     = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: 'Metacon Engenharia',
                        icon : {
                            url: 'assets/images/marker.png',
                            origin: new google.maps.Point(0,0),
                            anchor: new google.maps.Point(40,68)    // 27 for Px from the X axis (tip of pointer) and 42 For Px from the Y axis (Height)
                        }
                    });

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infoWindow.setContent("<div class='marker'><div class='marker-title'>"+coords[i].title+"</div><div class='marker-phone'><h3>Telefone: </h3><span>"+coords[i].phone+"</span></div></div>");
                        infoWindow.open(map, marker);
                    }
                })(marker, i));

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
        
        function testinomiesInit()
        {
            var owl = $testimoniesWrap.owlCarousel(TestimonyConfig);
            
            return owl;
        }
        
        function aboutSliderInit()
        {
            var owl = $aboutSliderWrap.owlCarousel(aboutSliderConfig);
            
            return owl;
        }
        
        function tabs( selected )
        {
            var target = selected.data("target");
            
            $tabsIndexes.removeClass("active");
            $tabsTargets.removeClass("active");
            
            $tabsIndexes.filter("[data-target='"+target+"']").addClass("active");
            $tabsTargets.filter("[data-tab='"+target+"']").addClass("active");
            
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
            testinomiesInit();
            causesInit();
            partnersInit();
            $.scrollIt({
                topOffset: -60,
                activeClass: 'active'
            });
        }
        
        if( $body.hasClass("about-us") )
        {
            CausesConfig.singleItem = true;
            partnersInit();
            causesInit();
            aboutSliderInit();
            
            $tabsIndexes.on("click", function(){
               tabs( $(this) ) 
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
        
    });
    
})(jQuery)