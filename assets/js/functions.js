/* ------------------------------------------------------------------------ */
/* Main JS File - functions.js 1.0
/* ------------------------------------------------------------------------ */
jQuery(document).ready(function($){
	'use strict';

	/* ------------------------------------------------------------------------ */
    /* Add .on-mobile Class for mobile devices
    /* ------------------------------------------------------------------------ */
    function mobileClass() {
    	if (/Android|BlackBerry|iPhone|iPad|iPod|IEMobile|Opera Mini|webOS/i.test(navigator.userAgent) === true) {
	        $('body').addClass('on-mobile');
	    }
    }

    mobileClass();


	/* ------------------------------------------------------------------------ */
	/* Menu
	/* ------------------------------------------------------------------------ */	
	function sfLoad() {

		$("#navigation ul.menu").superfish({
			delay:       	300,
			hoverClass:    	'sfHover',
			animation:     {opacity:'show'},
			animationOut:  {opacity:'hide'},
			speed:       	'normal',
			speedOut: 	 	'fast',
			cssArrows:   	true
		});

	}

	sfLoad();

	/* Open Submenu on left side when Screen is too small */
	var wapoMainWindowWidth;
	var subMenuExist;
	var subMenuWidth;
	var subMenuOffset;
	var newSubMenuPosition;

	function sfSubmenuPosition() {
		wapoMainWindowWidth = $(window).width();
		$('#navigation ul li ul').mouseover(function(){     
		    subMenuExist = $(this).find('.sub-menu').length;            
		    if( subMenuExist > 0){
		        subMenuWidth = $(this).find('.sub-menu').width();
		        subMenuOffset = $(this).find('.sub-menu').parent().offset().left + subMenuWidth;

		        // if sub menu is off screen, give new position
		        if((subMenuOffset + subMenuWidth) > wapoMainWindowWidth){                  
		            newSubMenuPosition = subMenuWidth + 3;
		            $(this).find('.sub-menu').css({
		                left: -newSubMenuPosition,
		                top: '0',
		            });
		        } else {
		        	$(this).find('.sub-menu').css({
		                left: newSubMenuPosition,
		                top: '0',
		            });
		        }
		    }
		 });
	}
	
	sfSubmenuPosition();

	/* ------------------------------------------------------------------------ */
	/* Header
	/* ------------------------------------------------------------------------ */
	$('.header-v1 #search-btn').click(function(){
		$('#search-top').stop(true,true).fadeIn(100);
		$('#logo-navigation, .header-icons-divider').stop().animate({'opacity' : 0}, 100);
		$('#search-top input[type=text]').focus();
		return false;
	});

	function closeSearch(){
		$('#search-top').stop(true,true).fadeOut(100);
		$('#logo-navigation, .header-icons-divider').stop().animate({'opacity' : 1}, 100);
	}
	
	$('#close-search-btn').click(function(){
		closeSearch();
		return false;
	});

	$('#search-top input[type=text]').blur(function(e){
		closeSearch();
	});

	$(window).resize(function() {
		if ($(window).width() < 960) {
			$('#search-top').hide();
		}
		else {
			$('#mobile-navigation').hide();
		}
	});

	// Shopping Cart Hover
	$(".header-v1 #shopping-btn, .header .widget_shopping_cart, .cart-popup").on({
    mouseenter: function () {
        $('.widget_shopping_cart').stop(true, false).fadeIn(200);
    },
    mouseleave: function () {
        $('.widget_shopping_cart').stop(true, false).fadeOut(200);
    }
	});

	// Remove Top Margin when Slider is first element
	function headerPadding(){
		$(window).resize(function() {
			if ($(window).width() < 945) {
				var headerHeight = $('#header').height();
				$('.header-is-transparent #page-wrap').has('#content > :first-child > .col > .wpb_column > .wpb_wrapper > .wpb_revslider_element').css({'padding-top': headerHeight});
			} else {
				$('.header-is-transparent #page-wrap').has('#content > :first-child > .col > .wpb_column > .wpb_wrapper > .wpb_revslider_element').css({'padding-top': '0'});
			}
		}).resize();
	}

	headerPadding();
    
	/* ------------------------------------------------------------------------ */
	/* Mobile Navigation
	/* ------------------------------------------------------------------------ */
	$('#mobile-navigation-btn').click(function(){
		$('#mobile-navigation').stop(true,true).slideToggle(300, 'easeOutBack'); //easeInOutSine works also nice at 200ms
		return false;
	});
	
	$('#mobile-navigation .container ul li').each(function(){
		if($(this).find('> ul').length > 0) {
			 $(this).addClass('has-ul');
			 $(this).find('> a').append('<i class="fa fa-chevron-down"></i>');
		}
	});
	
	$('#mobile-navigation .container ul li:has(">ul") > a i').click(function(){
		$(this).parent().parent().toggleClass('open');
		$(this).parent().parent().find('> ul').stop(true,true).slideToggle(300, 'easeOutBack');
		return false;
	});

	/* ------------------------------------------------------------------------ */
	/* Smooth Anchor Scrolling & onePage Scroll Version 2.0
	/* ------------------------------------------------------------------------ */
	function onePage() {

		if($("body").hasClass("pagescroll")){

			var scrolleffect = "easeOutQuad",
				scrollspeed	= 400,
				onepage_offset = $("#header").height(),
				onepage_offset2 = 150;
		
			if( window.location.hash ) {
				if($.browser.webkit){
					setTimeout ( function () {
						$.scrollTo( window.location.hash , 260 , { easing: scrolleffect , offset: -onepage_offset , "axis":"y" } );											
					}, 600);
				}
				else {
					$.scrollTo( window.location.hash , 260 , { easing: scrolleffect , offset: -onepage_offset , "axis":"y" } );		
				}
			}

			$("#nav li a[href*=\\#], a[href*=\\#].pagescroll").on("click", function(e){
				var linkhref = $(this.hash);
				$.scrollTo( linkhref, scrollspeed, { easing: scrolleffect , offset: -onepage_offset , 'axis':'y' } );	
				$(this).blur();
				e.preventDefault();
				//window.location.hash = $(this).attr('href').split('#')[1];
			})

			var currentNode = null;

			$('#nav li').removeClass('current-menu-item');
			
			$(window).scroll(function () {
				$('.section').each(function(){		
					if($(this).attr('id') != undefined && $(window).scrollTop() >= ($(this).offset().top - onepage_offset2)){
						currentNode = $(this).attr('id');
						$('#nav a').parent("li").removeClass('current-menu-item');
						$('#nav a[href$="#'+currentNode+'"]').parent("li").addClass('current-menu-item');
					}
				});
			});
	
		}

	}

	onePage();

	/* ------------------------------------------------------------------------ */
	/* Post Navigation
	/* ------------------------------------------------------------------------ */
	$('#post-navigation .prev').hover(
		function() {
			$(this).stop().animate({'left' : 0, 'opacity' : 1}, 160, 'easeOutSine');
		}, function() {
			$(this).stop().animate({'left' : -25, 'opacity' : 0.2}, 160, 'easeOutSine');
		}
	);

	$('#post-navigation .next').hover(
		function() {
			$(this).stop().animate({'right' : 0, 'opacity' : 1}, 160, 'easeOutSine');
		}, function() {
			$(this).stop().animate({'right' : -25, 'opacity' : 0.2}, 160, 'easeOutSine');
		}
	);
	
	/* ------------------------------------------------------------------------ */
	/* Back To Top
	/* ------------------------------------------------------------------------ */
	function backToTop() {

		$(window).scroll(function(){
			if($(window).scrollTop() > 200){
				$("#back-to-top").fadeIn(200);
			} else{
				$("#back-to-top").fadeOut(200);
			}
		});
		
		$('#back-to-top, .back-to-top').click(function() {
			  $('html, body').animate({ scrollTop:0 }, '800');
			  return false;
		});

	}
	
	backToTop();

	/* ------------------------------------------------------------------------ */
	/* Blog
	/* ------------------------------------------------------------------------ */
	// Blog Image Overlay
	$('.blog-item .blog-pic').hover(function() {
		$(this).find('.blog-overlay').stop().animate({'opacity' : 0.94}, 160);
		$(this).find('i').stop().animate({'margin-top' : '-33px', 'opacity' : 1}, 160, 'easeOutSine');
	}, function(){
		$(this).find('.blog-overlay').stop().animate({'opacity' : 0}, 160);
		$(this).find('i').stop().animate({'margin-top' : '23px', 'opacity' : 0}, 160);
	});

	// Blog Image Overlay
	$('.blog-wrap .post .entry-image a').append( '<div class="entry-overlay"><i class="icon-minti-plus"></i></div>' );
	$('.blog-single .post .entry-image a').append( '<div class="entry-overlay"><i class="icon-minti-search"></i></div>' );
	
	$('.post .entry-image').hover(function() {
		$(this).find('.entry-overlay').stop().animate({'opacity' : 0.94}, 160);
	}, function(){
		$(this).find('.entry-overlay').stop().animate({'opacity' : 0}, 160);
	});

	// Blog Isotope
	function blogMasonry() {

		var $blogcontainer = $('.blog-masonry .blog-wrap');

		$blogcontainer.imagesLoaded( function() {
			setTimeout(function(){
		        $blogcontainer.isotope({ layoutMode : 'masonry' });
				$blogcontainer.animate({'opacity' : 1}, 600);
				flexsliderLoad();
		    }, 500);
	    });
	    
	}

	blogMasonry();

    /* ------------------------------------------------------------------------ */
    /* Portfolio
    /* ------------------------------------------------------------------------ */

    // Portfolio Hover
    $('.widget_portfolio .portfolio-widget-item').hover(function() {
		$(this).find('.portfolio-overlay').stop().animate({'opacity' : 0.9}, 180);
	}, function(){
		$(this).find('.portfolio-overlay').stop().animate({'opacity' : 0}, 180);
	});

	// Overlay-Effect
    $('.portfolio-overlay-effect .portfolio-item .portfolio-image').hover(function() {
        $(this).find('.portfolio-overlay').stop().animate({'bottom' : 0}, 200,'easeOutCubic');
        $(this).find('.portfolio-image-img').stop().animate({'top' : '-60px'}, 440,'easeOutCubic');
    }, function(){
        $(this).find('.portfolio-overlay').stop().animate({'bottom' : '-80px'}, 440,'easeOutCubic');
        $(this).find('.portfolio-image-img').stop().animate({'top' : '0px'}, 200,'easeOutCubic');
    });

    // Overlay-Icon
    $('.portfolio-overlay-icon .portfolio-item .portfolio-image').hover(function() {
        $(this).find('.portfolio-overlay').stop().animate({'opacity' : 0.94}, 160);
        $(this).find('i').stop().animate({'margin-top' : '-33px', 'opacity' : 1}, 160, 'easeOutSine');
    }, function(){
        $(this).find('.portfolio-overlay').stop().animate({'opacity' : 0}, 160);
        $(this).find('i').stop().animate({'margin-top' : '23px', 'opacity' : 0}, 160);
    });

    // Overlay-Name
    $('.portfolio-overlay-name .portfolio-item .portfolio-image').hover(function() {
        $(this).find('.portfolio-overlay').stop().animate({'opacity' : 0.94}, 160);
    }, function(){
        $(this).find('.portfolio-overlay').stop().animate({'opacity' : 0}, 160);
    });

    // Portfolio Isotope
    function portfolioIsotope(){
    	
    	var $portfoliocontainer = $('.portfolio-items');
   		$('.portfolio-item').css({visibility: "visible", opacity: "0"});

	    $portfoliocontainer.imagesLoaded( function() {
	        $portfoliocontainer.fadeIn(1000).isotope({
	            transitionDuration: '0.6s',
	            itemSelector: '.portfolio-item',
	            resizable: false,
	            layoutMode: 'packery',
	            sortBy: 'origorder'
	        });

	        // Fade In
	        $('.portfolio-item').each(function(index){
	            $(this).delay(80*index).animate({opacity: 1}, 200);
	        });
	    });

	    /*$(window).resize(function() {
	        $portfoliocontainer.isotope('layout');
	    });*/

	    $('.portfolio-filters a').click(function(){
	        $('.portfolio-items').addClass('animatedcontainer');
	        $(this).closest('.portfolio-filters').find('a').removeClass('active');
	        $(this).addClass('active');
	        var selector = $(this).attr('data-filter');
	        var portfolioID = $(this).closest('.portfolio-filters').attr("data-id");
	        $('.portfolio-items[data-id=' + portfolioID + ']').isotope({ filter: selector });
	        return false;
	    });

    }

    portfolioIsotope();

    /* ------------------------------------------------------------------------ */
	/* FlexSlider
	/* ------------------------------------------------------------------------ */
	function flexsliderLoad() {

		$('.flexslider:not(.blogslider_holder)').each(function() {

			$(this).flexslider({
		        selector: ".slides > li",
		        animation: "slide", 
		        prevText: "",
		        nextText: "",
		        easing: "easeOutQuad", 
		        smoothHeight: true,
		        pauseOnHover: true,
		        animationSpeed: 300,
				start: function(slider) {
					$(slider).find('.slides')
					.mousedown(function(e) {
						$(this).attr('data-mousestart',e.screenX);
					})
					.mouseup(function(e) {
						var mousestart = parseInt($(this).attr('data-mousestart'),10);
						var mouseend = e.screenX;
						$(this).parents('.flexslider').find('.flex-direction-nav .flex-' + (mousestart - mouseend >= 0 ? 'next' : 'prev')).trigger('click');
					});
				}
		    });

		});

	}
   	
   	flexsliderLoad();

   	function blogsliderLoad() {

   		$('.blogslider_holder.flexslider').each(function() {

	   		var interval = 4000;
	   		var autoslide = true;

	   		interval = $(this).data("interval");
	   		
	   		if(interval == 0){
	   			autoslide = false;
	   		} else {
				autoslide = true;
	   		}

			 $(this).flexslider({
		        selector: ".slides > li",
		        animation: "slide", 
		        prevText: "",
		        nextText: "",
		        smoothHeight: true,
		        pauseOnHover: true,
		        animationLoop: true,
		        animationSpeed: 300,
		        slideshowSpeed: interval,
		        slideshow: autoslide,
		        controlNav: false, 
		        start: function(slider) {
					$(slider).find('.slides')
					.mousedown(function(e) {
						$(this).attr('data-mousestart',e.screenX);
					})
					.mouseup(function(e) {
						var mousestart = parseInt($(this).attr('data-mousestart'),10);
						var mouseend = e.screenX;
						$(this).parents('.flexslider').find('.flex-direction-nav .flex-' + (mousestart - mouseend >= 0 ? 'next' : 'prev')).trigger('click');
					});
				}
		    });

		});

	}
   	
   	blogsliderLoad();

   	function zoomingSlider() {
		if ($('.minti_zooming_slider').length) {
			$('.minti_zooming_slider').each(function() {
				var $slider = $(this);
				$slider.find('.minti_zooming_slider_item').eq(0).addClass('active');
				$slider.flexslider({
					animation: "slide",
					animationSpeed: 400,
					useCSS: true,
					touch: true,
					directionNav: true,
					start: function(slider) {
						$slider.find('.minti_zooming_slider_item').css({ 'opacity': '1', 'filter': 'alpha(opacity=100)' });
						var $titles = $slider.find('li:not(.clone) .minti_zooming_slider_item .image_wrapper .minti_zooming_slider_title');
						var $control_nav = $slider.find('.flex-control-nav');
						$control_nav.addClass('clearfix').find('li').css('width', 100 / $control_nav.find('li').length + '%').prepend('<div class="backline"></div>');
						var $control_links = $control_nav.find('li > a');
						$control_links.each(function() {
							$(this).html('');
							$('<div class="minti_zooming_slider_ghost'+($(this).parent().is(':first-child') ? ' shown' : '')+'"></div><div class="nav_title"><h6>' + $titles.eq($control_links.index($(this))).html() + '</h6></div>').insertAfter($(this)).click(function() {
								$(this).siblings('a').trigger('click');
							});
						});
						$(slider).find('.slides').mousedown(function(e) {
							$(this).attr('data-mousestart',e.screenX);
						}).mouseup(function(e) {
							var mousestart = parseInt($(this).attr('data-mousestart'),10);
							var mouseend = e.screenX;
							$(this).parents('.minti_zooming_slider').find('.flex-direction-nav .flex-' + (mousestart - mouseend >= 0 ? 'next' : 'prev')).trigger('click');
						});
					},
					before: function(slider) {
						var target = slider.animatingTo;
						var current = slider.find('.flex-active').parent().index();
						var $items = slider.find('.minti_zooming_slider_item').removeClass('active');
						$items.eq(target+1).add((target==0) ? $items.last() : (target==$items.length-3 ? $items.first() : '')).addClass('active');
						if (target==0) {
							$('.minti_zooming_slider .slides li:first-child').next().next().clone().appendTo('.minti_zooming_slider .slides').removeClass('clone').addClass('clone_end');
						}
						else if (target==$items.length-3) {
							$('.minti_zooming_slider .slides li:last-child').prev().prev().clone().appendTo('.minti_zooming_slider .slides').removeClass('clone').addClass('clone_start');
						}
						slider.find('.minti_zooming_slider_ghost.shown').css('left',(target-current)*100 + 50 + '%').removeClass('shown');
						slider.find('.flex-control-nav li').eq(target).find('.minti_zooming_slider_ghost').addClass('shown');
					},
					after: function(slider) {
						slider.find('.clone_start, .clone_end').remove();
						slider.find('.flex-control-nav li .minti_zooming_slider_ghost').css('left','');
					}
				});
			});
		}
	}

	zoomingSlider();
    
    /* ------------------------------------------------------------------------ */
    /* Alert Messages
    /* ------------------------------------------------------------------------ */
    $(".alert-message .close").click(function(){
        $(this).parent().animate({'opacity' : '0'}, 300).slideUp(300);
        return false;
    });

    /* ------------------------------------------------------------------------ */
    /* Counter
    /* ------------------------------------------------------------------------ */

    function counterLoad() {

    	$(".counter-number").each(function() {
	        var $countNumber = parseInt($(this).text());
	        $(this).waypoint(function(){ 
	            $(this).countTo({
	                from: 0,
	                to: $countNumber,
	                speed: 900,
	                refreshInterval: 25
	            });
	        },{ 
	            triggerOnce: true,
	            offset: '99%' 
	        }); 
	    });

    }

    counterLoad();

    /* ------------------------------------------------------------------------ */
    /* Parallax Background // By http://net.tutsplus.com/
    /* ------------------------------------------------------------------------ */

    function parallaxLoad() {

	    if (/Android|BlackBerry|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) === false) {
	        $('.section-parallax').each(function() {
	            var speed = $(this).data('speed')*0.4;
	            $(this).parallax("50%", speed);
	        });
	        $('.section-parallax').animate({'opacity': 1}, 600);
	    } else {
	        $('.section-parallax').animate({'opacity': 1}, 600);
	        $('.section-parallax').addClass('on-mobile');
	    }

    }

    parallaxLoad();

    /* ------------------------------------------------------------------------ */
    /* Columns Height & Vertical Center
    /* ------------------------------------------------------------------------ */
    function columnAlign(){

        $('.section:has(.vertical-center)').each(function(){

        	$(this).find('.vertical-center').animate({'opacity': 1}, 300);
            
            // Find tallest Column & set heights for all others
            var findTallest = 0;
            var columnHeight = 0;
            
            $(this).find('> .span_12 > .col').each(function(){
                var $padding = parseInt($(this).css('padding-top'));
                ($(this).find('> .wpb_wrapper').height() + ($padding*2) > findTallest) ? findTallest = $(this).find('> .wpb_wrapper').height() + ($padding*2) : findTallest = findTallest;
            }); 
            
            $(this).find('> .span_12 > .col').each(function(){
                $(this).css('height', findTallest);
            });

            // Vertical Center
            if($(this).find('> .span_12 > .col').hasClass('vertical-center') && window.innerWidth > 767){
                $(this).find('> .span_12 > .col').each(function(){
                    columnHeight = $(this).find('> .wpb_wrapper').height();
                    var $setMargins = ($(this).height()/2)-(columnHeight/2);

                    if($setMargins <= 0){
                        $setMargins = 0;
                    }

                    $(this).find('> .wpb_wrapper').css('margin-top', $setMargins);
                    //$(this).find('> .wpb_wrapper').css('margin-bottom', $setMargins);
                });
            }
           
        });

    }

    columnAlign();

    // Late Column Align
    // setTimeout(columnAlign,500);

    $(window).load(function(){
	 	 columnAlign();
	});

    /* ------------------------------------------------------------------------ */
    /* Masonry Grid
    /* ------------------------------------------------------------------------ */
	function initMasonryGrid(){

	    resizeMasonryGrid($('.grid-sizer').width());

	    $('.minti_masonrygrid_item').hover(function(){
	    	$(this).find('.minti_masonrygrid_item_overlay').stop().animate({'opacity' : 1}, 140);
	    }, function(){
	    	$(this).find('.minti_masonrygrid_item_overlay').stop().animate({'opacity' : 0}, 140);
	    });

	    $('.minti_masonrygrid_item').css({visibility: "visible", opacity: "0"});

	    if($('.minti_masonrygrid').length){

	        $('.minti_masonrygrid').each(function(){
	            var $this = $(this);
	            $this.imagesLoaded(function(){
	                $this.animate({opacity:1});
	                $this.isotope({
	                    itemSelector: '.minti_masonrygrid_item',
	                    masonry: {
	                        columnWidth: '.grid-sizer'
	                    }
	                });
	            });
		    
		    });

	        // Fade In
		    $('.minti_masonrygrid_item').each(function(index){
		        $(this).delay(80*index).animate({opacity: 1}, 200);
		    });

	        $(window).resize(function(){
	            resizeMasonryGrid($('.grid-sizer').width());
	            $('.minti_masonrygrid').isotope('reloadItems');
	        });

	    }
	}

	initMasonryGrid();

	function resizeMasonryGrid(size){

		var square_small = $('.masonry_ss .minti_masonrygrid_item_wrap');
		var square_big = $('.masonry_sb .minti_masonrygrid_item_wrap');
	    var rectangle_portrait = $('.masonry_rp .minti_masonrygrid_item_wrap');
	    var rectangle_landscape = $('.masonry_rl .minti_masonrygrid_item_wrap');

	    rectangle_portrait.css({'height': 2*size, 'width': size});
	    rectangle_landscape.css({'height': size, 'width': 2*size});
	    square_big.css({'height': 2*size, 'width': 2*size});
	    square_small.css({'height': size, 'width': size});

	    if (window.innerWidth < 768) {
        	square_big.css({'height': 2*size, 'width': size});
        	rectangle_landscape.css({'height': size, 'width': size});
    	}
	}

    /* ------------------------------------------------------------------------ */
    /* Video Section
    /* ------------------------------------------------------------------------ */
    var min_w = 1200; // minimum video width allowed
    var video_width_original = 1280;  // original video dimensions
    var video_height_original = 720;
    var vid_ratio = 1280/720;
 
    function resizeToCover() {
        $('.video-wrap').each(function(i){
            
            var $sectionHeight = $(this).parents('.wpb_row').outerHeight();         
            var $sectionWidth = $(this).parents('.wpb_row').outerWidth();

            $(this).width($sectionWidth);
            $(this).height($sectionHeight);
        
            // calculate scale ratio
            var scale_h = $sectionWidth / video_width_original;
            var scale_v = ($sectionHeight - $sectionHeight) / video_height_original; 
            var scale = scale_h > scale_v ? scale_h : scale_v;
            
            // limit minimum width
            min_w = vid_ratio * ($sectionHeight+20);
            
            if (scale * video_width_original < min_w) {scale = min_w / video_width_original;}
                
            $(this).find('video, .mejs-overlay, .mejs-poster').width(Math.ceil(scale * video_width_original + 20));
            $(this).find('video, .mejs-overlay, .mejs-poster').height(Math.ceil(scale * video_height_original + 20));
            
            $(this).scrollLeft(($(this).find('video').width() - $sectionWidth) / 2);
            $(this).scrollTop(($(this).find('video').height() - ($sectionHeight)) / 2);

            $(this).find('.mejs-overlay, .mejs-poster').scrollTop(($(this).find('video').height() - ($sectionHeight)) / 2);

        });
    }
    
    setTimeout(function(){
        resizeToCover();
        $('.video-wrap').animate({'opacity' : '1'}, 600);
    }, 600);

    // Remove Video on mobile Devices
    if (/Android|BlackBerry|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) === true) {
        $('.video-wrap').remove();      
    }
    
    /* ------------------------------------------------------------------------ */
    /* Skillbar
    /* ------------------------------------------------------------------------ */
    function progressbarLoad(){

	    $('.progressbar').each(function() {
	        $(this).waypoint(function(){ 
	            var dataperc = $(this).attr('data-perc');
	            $(this).find('.progress-percentage').animate({ "width" : dataperc + "%"}, dataperc*14);
	        },{ offset: '96%' }); 
	    });

    }

    progressbarLoad();
    
    /* ------------------------------------------------------------------------ */
    /* Toggle
    /* ------------------------------------------------------------------------ */
    if( $(".toggle .toggle-title").hasClass('active') ){
        $(".toggle .toggle-title.active").closest('.toggle').find('.toggle-inner').show();
    }
    
    $(".toggle .toggle-title").click(function(){
        if( $(this).hasClass('active') ){
            $(this).removeClass("active").closest('.toggle').find('.toggle-inner').slideUp(200,'easeOutQuad');
        }
        else{
            $(this).addClass("active").closest('.toggle').find('.toggle-inner').slideDown(200,'easeOutQuad');
        }
    });

  	// Open Sharebox links in Popup
	$('.sharebox a[target=_blank]').on('click', function(){
        newwindow=window.open($(this).attr('href'),'','height=450,width=700');
        if (window.focus) {newwindow.focus()}
        return false;
    });

	// Prevent iPad from Double Clicking in Dropdowns
	function ipadClick() {

		if (/Android|BlackBerry|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) === true) {
		    $('#navigation li ul li a').on('click touchend', function(e) {
			    var el = $(this);
			    var link = el.attr('href');
			    window.location = link;
			});
		}

	}

	ipadClick();

	// Tipsy Tooltips
	function tipsyLoad() {

		$('.meta-author a, .meta-comment a, .meta-category a, .portfolio-widget-item a, .sharebox li a').tipsy({
			fade: true,
			gravity: 's',
	        offset: 2
		});

		$('.tooltips a').tipsy({
			fade: true,
			gravity: 's',
			offset: 0,
		});

	}

	tipsyLoad();

	// FitVids
	function fitvidsLoad(){
		$("#portfolio-embed, .format-video, .format-audio, .video-embed").fitVids();
	}

	fitvidsLoad();
	
    // Animate Class
    function animateClass() {

    	if (/Android|BlackBerry|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) === false) {
	        setTimeout(function(){ 
	            $('.animate').each(function() {
	                
	                $(this).waypoint(function(){  

	                    if($(this).attr('data-animation') == 'fade-in-from-left'){
	                        $(this).delay($(this).attr('data-delay')).animate({'opacity' : 1, 'left' : '0px'},400,'easeOutSine');
	                    } else if($(this).attr('data-animation') == 'fade-in-from-right'){
	                        $(this).delay($(this).attr('data-delay')).animate({'opacity' : 1, 'right' : '0px'},400,'easeOutSine');
	                    } else if($(this).attr('data-animation') == 'fade-in-from-bottom'){
	                        $(this).delay($(this).attr('data-delay')).animate({'opacity' : 1, 'bottom' : '0px'},400,'easeOutSine');
	                    } else if($(this).attr('data-animation') == 'fade-in-from-top'){
	                        $(this).delay($(this).attr('data-delay')).animate({'opacity' : 1, 'top' : '0px'},400,'easeOutSine');
	                    } else if($(this).attr('data-animation') == 'fade-in') {
	                        $(this).delay($(this).attr('data-delay')).animate({'opacity' : 1},400,'easeOutSine');   
	                    }

	                },{ offset: '90%' }); 
	            
	            });
	        }, 100);
	    } else {
	        $('.animate').each(function() {
	            if($(this).attr('data-animation') == 'fade-in-from-left'){
	                $(this).delay($(this).attr('data-delay')).css({'opacity' : 1, 'left' : '0px'});
	            } else if($(this).attr('data-animation') == 'fade-in-from-right'){
	                $(this).delay($(this).attr('data-delay')).css({'opacity' : 1, 'right' : '0px'});
	            } else if($(this).attr('data-animation') == 'fade-in-from-bottom'){
	                $(this).delay($(this).attr('data-delay')).css({'opacity' : 1, 'bottom' : '0px'});
	            } else if($(this).attr('data-animation') == 'fade-in-from-top'){
	                $(this).delay($(this).attr('data-delay')).css({'opacity' : 1, 'top' : '0px'});
	            } else if($(this).attr('data-animation') == 'fade-in') {
	                $(this).delay($(this).attr('data-delay')).css({'opacity' : 1});   
	            }
	        });
	    } 

    }

    animateClass();
    
    // Add Parameters to YouTube Videos oEmbed
    $('.video-embed iframe[src^="http://www.youtube.com"], .video-embed iframe[src^="https://www.youtube.com"], .entry-video iframe[src^="http://www.youtube.com"], .entry-video iframe[src^="https://www.youtube.com"]').each(function() {
        var url = $(this).attr("src")
        $(this).attr("src",url.substring(0,url.indexOf('?')) + '?autohide=1&modestbranding=1&rel=0&showinfo=0')
    });

    // Window Resize Functions
    $(window).resize(function () { 
        resizeToCover(); 
        columnAlign();
        sfSubmenuPosition();
    });

	/* ---------------------------- */
	
});
