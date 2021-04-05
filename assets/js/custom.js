$(document).ready(function (){

  // Menu show Hide
  var counter = 0;
  $('.el_menu_btn').click(function(){
    if( counter == '0') {
      $('.el_navigation_wrapper').addClass('el_main_menu_hide');
      $(this).children().removeAttr('class');
      $(this).children().attr('class','fa fa-close');
      counter++;
    }
    else {
      $('.el_navigation_wrapper').removeClass('el_main_menu_hide');
      $(this).children().removeAttr('class');
      $(this).children().attr('class','fa fa-bars');
      counter--;
    }   
  });


// testimonial slider
  $('.el_testimonial_wrapper .owl-carousel').owlCarousel({
    loop:true,
    margin:0,
    nav:false,
    autoplay:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})



// blog slider
  $('.el_blog_wrapper .owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    autoplay:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:2
        }
    }
})

$(document).ready(function() {
  function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.el_banner_wrapper').css('min-height', windowHeight);
  };
  setHeight();
  
  $(window).resize(function() {
    setHeight();
  });
});


  // for counter 
    $('.timer').appear(function() {
      $(this).countTo();
    });


    // colro switcher
    var colorSheets = [
            {
                color: "#18ba60",
                title: "Switch to Default",
                href: "assets/css/style.css"
            },
            {
                color: "#f4426e",
                title: "Switch to pink",
                href: "assets/css/color/pink_color.css"
            },
            {
                color: "#b8849d",
                title: "Switch to light-red",
                href: "assets/css/color/light_red_color.css"
            },
            {
                color: "#ea4b36",
                title: "Switch to orange",
                href: "assets/css/color/orange_color.css"
            },
            {
                color: "#1990ce",
                title: "Switch to blue",
                href: "assets/css/color/blue_color.css"
            },
            {
                color: "#f69d01",
                title: "Switch to yellow",
                href: "assets/css/color/yellow_color.css"
            }
            
        ];

        ColorSwitcher.init(colorSheets);


// ajax
  $("#submit").click(function(){
      var name = $('#name').val();
      var phone = $('#phone').val();
      var letters = /^[A-Za-z]+$/;
      var number = /^[0-9]+$/;
           
      if (name != "" && phone != "") {
          if(name.match(letters)) { 
              if(phone.match(number) && phone.length <= 10) {
                      $.ajax({
                      method : 'post',
                      url : 'ajax.php',
                      data :  {'name' : name ,
                                'phone' : phone,
                                },
                     }).done(function(resp){
                         if( resp == 1){
                              document.getElementById("error").style.color = "green";
                             document.getElementById("error").innerHTML = "Mail Send Successfully";
                              $('#name').val('');
                             $('#phone').val('');
                         }else{
                              document.getElementById("error").style.color = "red";
                              document.getElementById("error").innerHTML = "Mail not Send";
                         }
                     console.log(resp); });
              
              }else{
                  document.getElementById("error").style.color = "red";
                  document.getElementById("error").innerHTML = "Please Fill The  Correct Number";
              }
          }else
          {   document.getElementById("error").style.color = "red";
              document.getElementById("error").innerHTML = "Please Fill The Correct Name";
          }   
      }else{
          document.getElementById("error").style.color = "red";
          document.getElementById("error").innerHTML = "Please Fill All Detail";
      }
  });
        
// Single page scroll menu
  var pluginName = 'ScrollIt',
    pluginVersion = '1.0.3';

  /*
   * OPTIONS
   */
  var defaults = {
    upKey: 38,
    downKey: 40,
    easing: 'linear',
    scrollTime: 600,
    activeClass: 'active',
    onPageChange: null,
    topOffset : -70
  };

  $.scrollIt = function(options) {

    /*
     * DECLARATIONS
     */
    var settings = $.extend(defaults, options),
      active = 0,
      lastIndex = $('[data-scroll-index]:last').attr('data-scroll-index');

    /*
     * METHODS
     */

    /**
     * navigate
     *
     * sets up navigation animation
     */
    var navigate = function(ndx) {
      if(ndx < 0 || ndx > lastIndex){ return; }

      var targetTop = $('[data-scroll-index=' + ndx + ']').offset().top + settings.topOffset + 1;
      $('html,body').animate({
        scrollTop: targetTop,
        easing: settings.easing
      }, settings.scrollTime);
    };

    /**
     * doScroll
     *
     * runs navigation() when criteria are met
     */
    var doScroll = function (e) {
      var target = $(e.target).closest("[href]").attr('href') ||
      $(e.target).closest("[data-scroll-goto]").attr('data-scroll-goto');
      navigate(parseInt(target,10));
    };

    /**
     * keyNavigation
     *
     * sets up keyboard navigation behavior
     */
    var keyNavigation = function (e) {
      var key = e.which;
      if($('html,body').is(':animated') && (key == settings.upKey || key == settings.downKey)) {
        return false;
      }
      if(key == settings.upKey && active > 0) {
        navigate(parseInt(active,10) - 1);
        return false;
      } else if(key == settings.downKey && active < lastIndex) {
        navigate(parseInt(active,10) + 1);
        return false;
      }
      return true;
    };

    /**
     * updateActive
     *
     * sets the currently active item
     */
    var updateActive = function(ndx) {
      if(settings.onPageChange && ndx && (active != ndx)) {settings.onPageChange(ndx); }

      active = ndx;
      $('[href]').removeClass(settings.activeClass);
      $('[href=' + ndx + ']').addClass(settings.activeClass);
    };

    /**
     * watchActive
     *
     * watches currently active item and updates accordingly
     */
    var watchActive = function() {
      var winTop = $(window).scrollTop();

      var visible = $('[data-scroll-index]').filter(function(ndx, div) {
        return winTop >= $(div).offset().top + settings.topOffset &&
        winTop < $(div).offset().top + (settings.topOffset) + $(div).outerHeight();
      });
      var newActive = visible.first().attr('data-scroll-index');
      updateActive(newActive);
    };

    /*
     * runs methods
     */
    $(window).on('scroll',watchActive).scroll();

    $(window).on('keydown', keyNavigation);

    $('.scroll_menu').on('click','[href], [data-scroll-goto]', function(e){
      e.preventDefault();
      doScroll(e);
    });

  };


});


document.addEventListener('DOMContentLoaded', function() {
  var typed = new Typed('#typed', {
    stringsElement: '#typed-strings',
    typeSpeed: 70,
    backSpeed: 70,

    loop: true,
    loopCount: Infinity,
    onComplete: function(self) { prettyLog('onComplete ' + self) },
    preStringTyped: function(pos, self) { prettyLog('preStringTyped ' + pos + ' ' + self); },
    onStringTyped: function(pos, self) { prettyLog('onStringTyped ' + pos + ' ' + self) },
    onLastStringBackspaced: function(self) { prettyLog('onLastStringBackspaced ' + self) },
    onTypingPaused: function(pos, self) { prettyLog('onTypingPaused ' + pos + ' ' + self) },
    onTypingResumed: function(pos, self) { prettyLog('onTypingResumed ' + pos + ' ' + self) },
    onReset: function(self) { prettyLog('onReset ' + self) },
    onStop: function(pos, self) { prettyLog('onStop ' + pos + ' ' + self) },
    onStart: function(pos, self) { prettyLog('onStart ' + pos + ' ' + self) },
    onDestroy: function(self) { prettyLog('onDestroy ' + self) }
  });

});

function prettyLog(str) {
  ('%c ' + str, 'color: green; font-weight: bold;');
}

