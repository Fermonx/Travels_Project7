$(document).ready(function () {

    /*$(window).scroll(function() {

        var wScroll = $(this).scrollTop();
        var pos = $('.quienes-somos').position().top;

        if ($(window).width() > 576) {
            $('.quienes-somos').css({
                'background-position': 'center '+(wScroll*0.5)+'px'
            });
        }
    });*/

    $(window).on('scroll', function () {
        if($(window).scrollTop()===0 && $("#menu-toggler").attr("aria-expanded")===true) {
            $('nav').removeClass('nav-scroll');
            $('#main-menu').addClass('menu-scroll');
        };
    });

    $(window).on('scroll', function () {
        if($(window).scrollTop()) {
            $('nav').addClass('nav-scroll');
            $('#main-menu').addClass('menu-scroll');
        } else {
            if ($("#menu-toggler").attr("aria-expanded")==="false") {
                $('nav').removeClass('nav-scroll');
                $('#main-menu').removeClass('menu-scroll');
            };
        };
    });

    /*$(window).on('scroll', function () {
        var wScroll = $(this).scrollTop();
        if (wScroll > $('.destinos-items').offset().top - ($(window).height() / 1.2)){
            $('.destinos-items .destinos-item').each(function (i) {
                setTimeout(function () {
                    $('.destinos-items .destinos-item').eq(i).addClass('is-showing');
                }, 300 * (i + 1));
            });
        };

    });*/


    var pressed = true;
    $("#menu-toggler").click(function () {
        var altura = $(window).scrollTop();

        if (altura === 0) {
            if ($("#menu-toggler").attr("aria-expanded")==="false") {
                pressed = false;
                $('nav').addClass('nav-scroll');
                $('#main-menu').addClass('menu-scroll');
            } else {
                pressed = true;
                $('nav').removeClass('nav-scroll');
                $('#main-menu').removeClass('menu-scroll');
            }
        }
    });

    $('.material-heart').on('click', function () {
        $(this).toggleClass('material-heart-red')
    });

    $('.heartt').on('click', function () {
        $(this).toggleClass('material-heart-red2')
    });

    $(window).on('scroll', function () {
        if ($(this).scrollTop()>100) {
            $('#totop').fadeIn(600);
        } else {
            $('#totop').fadeOut(600);
        }
    });

    $('#totop').click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
    });

});


$(document).ready(function(){
    $("a").tooltip();
});