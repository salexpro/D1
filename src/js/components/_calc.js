const calc_data = {
    round: {
        '0.5': 1852,
        '1': 10154,
        '1.5': 18386,
        '2': 29192,
        '2.5': 41980,
        '3': 53394
    },
    princess: {
        '0.5': 1084,
        '1': 5098,
        '1.5': 13247,
        '2': 28796,
        '2.5': 39463,
        '3': 58068
    },
    oval: {
        '0.5': 1237,
        '1': 5758,
        '1.5': 12908,
        '2': 26830,
        '2.5': 36980,
        '3': 46443
    },
    marquise: {
        '0.5': 1026,
        '1': 5746,
        '1.5': 10920,
        '2': 23572,
        '2.5': 33233,
        '3': 47091
    },
    pear: {
        '0.5': 1405,
        '1': 5619,
        '1.5': 13902,
        '2': 34664,
        '2.5': 49483,
        '3': 66891
    },
    emerald: {
        '0.5': 1096,
        '1': 4951,
        '1.5': 10181,
        '2': 21198,
        '2.5': 40965,
        '3': 56250
    },
    cushion: {
        '0.5': 1957,
        '1': 4412,
        '1.5': 13071,
        '2': 21128,
        '2.5': 32653,
        '3': 45453
    },
    asscher: {
        '0.5': 2022,
        '1': 4412,
        '1.5': 13071,
        '2': 19140,
        '2.5': 28775,
        '3': 43056
    }
}

const calc_form = $('form[action="pick"]');

const get_cost = () => {
    const shape = $('[name="diamonds"]:checked', calc_form).attr('id');
    const carat = $('[name="carats"]', calc_form).val() == 2.5 ? 3 : $('[name="carats"]', calc_form).val();
    return calc_data[shape][carat];
}

const redraw = () => {
    const cost_usd = get_cost();
    const cost_d1 = (cost_usd / 12).toFixed(2);
    $('.matrix_calc_cost_d1').text(cost_d1);
    $('.matrix_calc_cost_usd').text('$' + cost_usd);
}

$('.matrix_picker_item').click(function () {
    if (!Foundation.MediaQuery.atLeast('large')) {
        $('#diamond_type').foundation('open');
    }
});

$('#diamond_type').on('opened.zf.offcanvas', () => {
    const selected = $('[name="diamonds"]:checked').attr('id');
    $('.matrix_picker_mobile_item').removeClass('is_active');
    $('.matrix_picker_mobile_item[for="' + selected + '"]').addClass('is_active');
});

$('.matrix_picker_mobile_item').click(function () {
    $('.matrix_picker_mobile_item').removeClass('is_active');
    $(this).addClass('is_active');
    $('#diamond_type').foundation('close');
});

$('[name="diamonds"]', calc_form).change(() => {
    redraw()
});

$('.matrix_slider').on('moved.zf.slider', function () {
    let val = $('[name="carats"]', this).val();
    $('.slider_step').removeClass('is_active');
    $('.slider_step[data-val="' + val + '"]').addClass('is_active');
    redraw();
});

$('form[action="pick"]').submit(e => {
    e.preventDefault();
    $('#whitelist [name="amount"]').val(get_cost());
    $('#whitelist').foundation('open');
})

// $('form[action="buy"]').submit(e => {
//     e.preventDefault();
//     open_new('#buy', '#success');
// })

// Tooltip
const calc_tooltip = $('.matrix_tooltip');
const matix_tip_content = `
    <p class="h2 tooltip_header">${$('#prices_mobile .reveal_header').text()}</p>
    <table class="reveal_table">${$('#prices_mobile .reveal_table').html()}</table>
`;

new Foundation.Tooltip(calc_tooltip, {
    tipText: matix_tip_content,
    position: 'bottom',
    allowHtml: true,
    showOn: 'medium'
});

calc_tooltip.click(() => {
    if (!Foundation.MediaQuery.atLeast('medium')) {
        $('#prices_mobile').foundation('open');
    }
})