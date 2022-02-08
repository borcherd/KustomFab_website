'use strict';
$(document).ready(function () {
  // Mobile agent check
  var isMobile = window.matchMedia("only screen and (max-width: 760px)");

  // Handling animations and interactions of navigation
  $('.navbar-toggler').on('click', function () {
    $(this).toggleClass('open');
  });

  $('.navbar-nav').on('click', function (e) {
    // Event delegation for mobile nav links
    if ( 
      $(e.target).is('a')
      &&
      !$(e.target).is('.dropdown a')
    ) {
      if (isMobile.matches) {
        $('.navbar-collapse').collapse('toggle');
      }
      $('.navbar-toggler').toggleClass('open');
    }
  });
  
  if (isMobile.matches) {
    $('.dropdown').on('click', function (e) {
      if ($(e.target).is('.dropdown-toggle') ) {
        e.preventDefault();
        var dropdownMenu = $(this).find('.dropdown-menu').first();
        if ( dropdownMenu.css( 'display' ) === 'inline-block' ) {
          dropdownMenu.css( 'display', 'none' );
        } else {
          dropdownMenu.css('display', 'inline-block');
        }
      }
      e.stopPropagation();
    });
  } else {
    // Dropdown on hover
    $('.dropdown').find( '.dropdown-menu' ).css( 'display', 'none' );
    $('.dropdown').on({
      mouseenter: function () {
        var dropdownMenu = $(this).find('.dropdown-menu').first();
        if ( dropdownMenu.css('display') === 'none' ) {
          dropdownMenu.css( 'display', 'block' ).addClass('fadeIn');
        }
      },
      mouseleave: function () {
        var dropdownMenu = $(this).find('.dropdown-menu').first();
        if ( dropdownMenu.css('display') === 'block' ){
          dropdownMenu.removeClass('fadeIn').delay(1000).css( 'display', 'none' );
        }
      }
    });
  }

  $(window).on('scroll touchmove', function () {
    var header = $("header");
    var scroll = $(window).scrollTop();

    if (scroll >= 20) {
      header.removeClass('top').addClass("fixed");
    } else {
      header.removeClass("fixed").addClass('top');
    }
  }).scroll();

  $('#image-split').twentytwenty({
    default_offset_pct: 0.3,
  });

  // Smooth scrolling
  // Select all links with hashes
  $('.navbar-nav')
    .on('click', function (event) {
      var el = event.target;
      // On-page links
      if (
        // Delegating event to links in nav
        $(event.target).is('a[href*="#"]')
        &&
        !$(event.target).is('[href="#"]')
        &&        
        !$(event.target).is('[href="#0"]')
        &&        
        location.pathname.replace(/^\//, '') == el.pathname.replace(/^\//, '')
        &&
        location.hostname == el.hostname
      ) {
        // Figure out element to scroll to
        var target = $(el.hash);
        target = target.length ? target : $('[name=' + el.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });
  // Build portfolio item gallery for Photoswipe
  var items = [];

  $('#portfolio img').each(function () {
    items.push({
      src: $(this).attr('src'),
      w: 601,
      h: 338
    });
  });
  // PhotoSwipe configuration
  var initPhotoSwipe = function (index) {
    var pswpElement = document.querySelectorAll('.pswp')[0];
    // define options (if needed)
    var options = {
      // optionName: 'option value'
      // for example:
      index: index // start at first slide
    };

    // Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  }
  // Initialize PhotoSwipe
  $('#portfolio a').on('click', function () {
    initPhotoSwipe($(this).index());
  });
});

// Google Map loader
// HEADS UP! - Put your api key in index.html just before closing body tag
// in line https://maps.googleapis.com/maps/api/js?key=PUT-KEY-HERE&callback...
// to get map working for you.
function initMap() {
  // Update these coordinates to change location in the map
  var location = new google.maps.LatLng(50.965192, 5.690414);

  var map = new google.maps.Map(document.getElementById('google-map'), {
    center: location,
    zoom: 8,
    scrollwheel: false,
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }]
      }
    ]
  });
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      strokeColor: '#FFF',
      scale: 5,
      strokeWeight: 3
    }
  });
}
