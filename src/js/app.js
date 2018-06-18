/* 
@codekit-prepend quiet '../../node_modules/jquery/dist/jquery.min',
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.core.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.mediaQuery.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.box.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.motion.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.triggers.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.keyboard.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.touch.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.slider.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.tabs.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.accordion.min';
@codekit-prepend quiet '../../node_modules/owl.carousel/dist/owl.carousel.min';
*/

$(document).foundation();

$('.news_items').owlCarousel({
    nav: true,
    items: 5,
    autoWidth: true,
    margin: 118,
    navText: ['', '']
});

$('.matrix_slider').on('moved.zf.slider', function() {
    let val = $('[name="carats"]', this).val();
    $('.slider_step').removeClass('is_active');
    $('.slider_step[data-val="' + val + '"').addClass('is_active');
});

$('.advisors_items').owlCarousel({
    nav: true,
    items: 1,
    navText: ['', '']
});

$('.roadmap_items').owlCarousel({
    nav: true,
    items: 3,
    navText: ['', '']
});

$('.publications_items').owlCarousel({
    nav: true,
    items: 4,
    navText: ['', '']
});

$('.partners_items').owlCarousel({
    nav: true,
    items: 4,
    navText: ['', ''],
    autoWidth: true,
    margin: 183
});

$('.videos_items').owlCarousel({
    nav: true,
    items: 3,
    navText: ['', '']
});