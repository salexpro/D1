/* global Foundation */
/* 
@codekit-prepend quiet '../../node_modules/jquery/dist/jquery.min',
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.core.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.mediaQuery.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.box.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.motion.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.triggers.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.keyboard.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.util.touch.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.dropdown.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.slider.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.tooltip.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.tabs.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.accordion.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.reveal.min';
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

// Tooltip
const matix_tip_content = `
<p class="h2 tooltip_header">Price estimation is based on the following criteria:</p>
<table class="reveal_table">
    <tr>
        <th>Cut</th>
        <td>1111</td>
    </tr>
    <tr>
        <th>color </th>
        <td>222</td>
    </tr>
    <tr>
        <th>clarity </th>
        <td>3333</td>
    </tr>
    <tr>
        <th>depth </th>
        <td>4444</td>
    </tr>
    <tr>
        <th>table </th>
        <td>555</td>
    </tr>
    <tr>
        <th>Polish</th>
        <td>6666</td>
    </tr>
    <tr>
        <th>summetry</th>
        <td>7777</td>
    </tr>
    <tr>
        <th>culet</th>
        <td>88</td>
    </tr>
    <tr>
        <th>fluorescence</th>
        <td>9999</td>
    </tr>
</table>
`;
new Foundation.Tooltip($('.matrix_tooltip'), {
    tipText: matix_tip_content,
    position: 'bottom',
    allowHtml: true,
    clickOpen: true
});

// Forms
$('form[action="whitelist"]').submit(e => {
    e.preventDefault();
    open_new('#whitelist', '#success');
})

$('form[action="whitelist"] [name="country"]').focus(() =>{
    open_new('#whitelist', '#country');
})

$('form[action="country"]').submit(function(e) {
    e.preventDefault();
    const country = $('[name="country"]:checked', this).val();
    $('form[action="whitelist"] [name="country"]').val(country);
    $('#country').foundation('close');
})

$('form[action="pick"]').submit(e => {
    e.preventDefault();
    $('#buy').foundation('open');
})

$('form[action="buy"]').submit(e => {
    e.preventDefault();
    open_new('#buy', '#success');
})

$('form[action="subscribe"]').submit(e => {
    e.preventDefault();
    $('#success').foundation('open');
})

// Team modal
$('.people_item[data-open]').click(function(){
    const photo = $('.people_item_photo img', this).attr('src');
    const name  = $('.people_item_name', this).text();
    const position = $('.people_item_info', this).text();
    const ln = $('.people_item_social a', this).attr('href');

    $('#member .people_item_photo img').attr({src: photo, alt: name});
    $('#member .reveal_member_social a').attr('href', ln);
    $('#member .people_item_name').text(name);
    $('#member .people_item_info').text(position);
    $('#member .people_item_bio').html($(this).data('bio'));
});

// Fix opening modal in modal
const open_new = (wold, wnew) => {
    $(wold).on('closed.zf.reveal', () => {
        $(wnew).foundation('open');
        $(wold).off('closed.zf.reveal');
    });
    $(wold).foundation('close');
    if (wold == '#whitelist' && wnew != '#success') {
        $(wnew).on('closed.zf.reveal', () => {
            $(wold).foundation('open');
            $(wnew).off('closed.zf.reveal');
        });
    }
}
$('.reveal [data-open]').click(function (e) {
    e.stopPropagation();
    open_new('#' + $(this).closest('.reveal').attr('id'), '#' + $(this).data('open'));
});