;(function($) {

//Mobile-menu
$('.mobile_btn').on ('click', function(){
    $("body").addClass("menu-active");
    $(".body-mask").show();
});

$('.btn_close, .body-mask').on ('click', function(){
    $("body").removeClass("menu-active");
    $(".body-mask").hide();
});

//Language dropdown
$('.current-lang').on('click', function() {
    if (!$(this).hasClass('show')) {
        $('.lang__list').stop(true, false).slideDown(100);
        $(this).addClass('show');
    }
    else {
        $('.lang__list').stop(true, false).slideUp(100);
        $(this).removeClass('show');
    }
});

//Top-line fixed
$(window).on('scroll', function() {
    var scrolled = $(window).scrollTop();
    if (scrolled > 0) {
        $('.header').addClass('header__fixed');
    }else  {
        $('.header').removeClass('header__fixed');
    };
});

//Tabs conditions
$('.tabs__menu').on('click', '.tabs__control--item:not(.active)', function() {
    $(this)
        .addClass('active').siblings().removeClass('active')
        .closest('div.tabs').find('div.tabs__content').removeClass('active')
        .eq($(this).index()).addClass('active');
});

//Sliders
$(function() {
    $('.advantages').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
                {
                    breakpoint: 768,
                    settings: 'unslick'
                }
        ]
    });

    $(window).on('resize', function() {
        $('.advantages').slick('resize');
    });
});

new WOW().init();

})(jQuery);


