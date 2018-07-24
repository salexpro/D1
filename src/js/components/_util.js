Array.prototype.unique = function () {
    let obj = {}, arr = [];
    this.forEach(el => {
        obj[el[0]] = el[1]
    });
    for (const key in obj) {
        arr.push([key, obj[key]])
    }
    return arr;
}

// Native select for tabs
$('select[data-target]').change(function () {
    const parent = $(this).data('target');
    const tab = $(this).val();
    $(parent).foundation('selectTab', tab);
});

$(window).on('changed.zf.mediaquery', () => {
    if (!Foundation.MediaQuery.atLeast('large')) {
        $('.tabs').each(function () {
            const id = $(this).attr('id');
            const selected = $('.is-active a', this).attr('href').substr(1);
            $('select[data-target="#' + id + '"] [value="' + selected + '"]').prop('selected', true);
        })
    }
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