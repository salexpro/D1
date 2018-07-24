// Team modal
$('.people_item[data-open]').click(function(e){
    e.stopPropagation();
    const type = $(this).data('open');
    const photo = $('.people_item_photo img', this).attr('src');
    const srcset = $('.people_item_photo img', this).attr('srcset');
    const name  = $('.people_item_name', this).text();
    const position = $('.peopl  e_item_info', this).text();
    const ln = $('.people_item_social a', this).attr('href');

    $('#member .people_item_photo img').attr({
        src: photo,
        srcset: srcset,
        alt: name
    });
    $('#member .reveal_member_social a').attr('href', ln);
    $('#member .people_item_name').text(name);
    $('#member .people_item_info').text(position);
    $('#member .people_item_bio').html($(this).data('bio'));

    if ((type == 'advisor' && !Foundation.MediaQuery.atLeast('medium')) || type == 'team') {
        $('#member').foundation('open');
    }
});

// Video modal
$('[data-video]').click(function () {
    player.loadVideoById($(this).data('video'));
    $('#video').foundation('open');
})

$('#video').on('closed.zf.reveal', () => {
   player.stopVideo();
})

/* eslint-disable */
let player;
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
const onYouTubeIframeAPIReady = () => {
    player = new YT.Player('player');
}
/* eslint-enable */