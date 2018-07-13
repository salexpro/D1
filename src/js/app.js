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
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.smoothScroll.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.dropdown.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.slider.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.tooltip.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.tabs.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.accordion.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.reveal.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.offcanvas.min';
@codekit-prepend quiet '../../node_modules/foundation-sites/dist/js/plugins/foundation.interchange.min';
@codekit-prepend quiet '../../node_modules/owl.carousel/dist/owl.carousel.min';
@codekit-prepend quiet '../../node_modules/shufflejs/dist/shuffle.min';
*/

$(document).foundation();

$('.news_items').owlCarousel({
    nav: true,
    navText: ['', ''],
    responsive: {
        0: {
            items: 2
        },
        640: {
            items: 3
        },
        1024:{
            items: 4
        },
        1170: {
            margin: 118,
            autoWidth: true
        }
    }
});

$('.matrix_picker_item').click(function() {
    if (!Foundation.MediaQuery.atLeast('large')) {
        $('#diamond_type').foundation('open');
    }
})

$('.matrix_slider').on('moved.zf.slider', function() {
    let val = $('[name="carats"]', this).val();
    $('.slider_step').removeClass('is_active');
    $('.slider_step[data-val="' + val + '"').addClass('is_active');
});
    
$('#diamond_type').on('opened.zf.offcanvas', () => {
    const selected = $('[name="diamonds"]:checked').attr('id');
    $('.matrix_picker_mobile_item').removeClass('is_active');
    $('.matrix_picker_mobile_item[for="' + selected + '"]').addClass('is_active');
});

$('.matrix_picker_mobile_item').click(function() {
    $('.matrix_picker_mobile_item').removeClass('is_active');
    $(this).addClass('is_active');
});

$('.advisors_items').owlCarousel({
    nav: true,
    items: 1,
    margin: 20,
    autoHeight: true,
    navText: ['', '']
});

$('.roadmap_items').owlCarousel({
    nav: true,
    navText: ['', ''],
    responsive: {
        0: {
            items: 1
        },
        640: {
            items: 2
        },
        1024:{
            items: 3
        }
    }
});

$('.publications_items').owlCarousel({
    nav: true,
    navText: ['', ''],
    responsive: {
        0: {
            items: 1
        },
        640: {
            items: 2
        },
        1024: {
            items: 4
        }
    }
});

$('.partners_items').owlCarousel({
    nav: true,
    navText: ['', ''],
    responsive: {
        0: {
            items: 2
        },
        640: {
            items: 4
        },
        1170: {
            margin: 183,
            autoWidth: true
        }
    }
});

$('.videos_items').owlCarousel({
    nav: true,
    navText: ['', ''],
    responsive: {
        0: {
            items: 1
        },
        640: {
            items: 2
        },
        1024: {
            items: 3
        }
    }
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
    allowHtml: true
});

// Native select for tabs
$('select[data-target]').change(function(){
    const parent = $(this).data('target');
    const tab = $(this).val();
    $(parent).foundation('selectTab', tab);
});

$(window).on('changed.zf.mediaquery', () => {
    if (!Foundation.MediaQuery.atLeast('large')) {
        $('.tabs').each(function() {
            const id = $(this).attr('id');
            const selected = $('.is-active a', this).attr('href').substr(1);
            $('select[data-target="#' + id + '"] [value="' + selected + '"]').prop('selected', true);
        })
    }
});

// Forms
$('form[action="whitelist"]').submit(e => {
    e.preventDefault();
    open_new('#whitelist', '#success');
})

$('form[action="whitelist"] [name="country"]').focus(() =>{
    open_new('#whitelist', '#country');
});
$('#country').on('open.zf.reveal', () => {
    setTimeout(() => {
        shuffleInstance.update();
    }, 0);
});

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
$('.people_item[data-open]').click(function(e){
    e.stopPropagation();
    const type = $(this).data('open');
    const photo = $('.people_item_photo img', this).attr('src');
    const name  = $('.people_item_name', this).text();
    const position = $('.peopl  e_item_info', this).text();
    const ln = $('.people_item_social a', this).attr('href');

    $('#member .people_item_photo img').attr({src: photo, alt: name});
    $('#member .reveal_member_social a').attr('href', ln);
    $('#member .people_item_name').text(name);
    $('#member .people_item_info').text(position);
    $('#member .people_item_bio').html($(this).data('bio'));

    if ((type == 'advisor' && !Foundation.MediaQuery.atLeast('medium')) || type == 'team') {
        $('#member').foundation('open');
    }
});

// Video modal
$('[data-video]').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    const src = 'https://www.youtube.com/embed/' + $(this).data('video');
    const container = $('#video .reveal_video');
    if ($('#video iframe').attr('src') != src){
        container.removeClass('visible');
        $('#video iframe').attr('src', src);
        container.addClass('visible');
    }   
    $('#video').foundation('open');
})

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

// Country search
const Shuffle = window.Shuffle;
const element = document.querySelector('.form--choose');
const sizer = element.querySelector('.form_field--sizer');

const shuffleInstance = new Shuffle(element, {
    itemSelector: '.form_field',
    sizer: sizer
});

$('#country [type="search"]').on('keyup', function() {
    const sch_text = $(this).val();
    shuffleInstance.filter(el => $(el).data('title').indexOf(sch_text)!==-1);
})