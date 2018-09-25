const calc_data = {
    round: {
        '0.5': 185.20,
        '1': 1015.40,
        '1.5': 1838.60,
        '2': 2919.20,
        '2.5': 4198.00,
        '3': 5339.40,
    },
    princess: {
        '0.5': 108.40,
        '1': 509.80,
        '1.5': 1324.70,
        '2': 2879.60,
        '2.5': 3946.30,
        '3': 5806.80,
    },
    oval: {
        '0.5': 123.70,
        '1': 575.80,
        '1.5': 1290.80,
        '2': 2683.00,
        '2.5': 3698.00,
        '3': 4644.30,
    },
    marquise: {
        '0.5': 102.60,
        '1': 574.60,
        '1.5': 1092.00,
        '2': 2357.20,
        '2.5': 3323.30,
        '3': 4709.10,
    },
    pear: {
        '0.5': 140.50,
        '1': 561.90,
        '1.5': 11390.20,
        '2': 33466.40,
        '2.5': 44948.30,
        '3': 66689.10,
    },
    emerald: {
        '0.5': 109.60,
        '1': 495.10,
        '1.5': 1018.10,
        '2': 2119.80,
        '2.5': 4096.50,
        '3': 5625.00,
    },
    cushion: {
        '0.5': 195.70,
        '1': 441.20,
        '1.5': 1307.10,
        '2': 2112.80,
        '2.5': 3265.30,
        '3': 4545.30,
    },
    asscher: {
        '0.5': 202.20,
        '1': 441.20,
        '1.5': 1307.10,
        '2': 1914.00,
        '2.5': 2877.50,
        '3': 4305.60,
    }
}

const calc_form = $('form[action="pick"]');

const d1_rate = {
    'USD': 10,
    'EUR': 8.65,
    'GBP': 7.76
}
$.get('https://api.coinmarketcap.com/v2/ticker/1/', data => {
    d1_rate['BTC'] = data.data.quotes.USD.price;
    calc_redraw();
})
$.get('https://api.coinmarketcap.com/v2/ticker/1027/', data => {
    d1_rate['ETH'] = data.data.quotes.USD.price;
    calc_redraw();
})

const get_cost = currency => {
    const shape = $('[name="diamonds"]:checked', calc_form).attr('id');
    const carat = $('[name="carats"]', calc_form).val() == 2.5 ? 3 : $('[name="carats"]', calc_form).val();
    let cost = 0;
    switch (currency) {
        case 'USD':
        case 'EUR':
        case 'GBP':
            cost = (calc_data[shape][carat] * d1_rate[currency]).toFixed(0);
            break;
        case 'BTC':
        case 'ETH':
            cost = (calc_data[shape][carat] * d1_rate['USD'] / d1_rate[currency]).toFixed(2);
            break;
        default:
            cost = calc_data[shape][carat];
            break;
    }
    return cost;
}

const calc_redraw = () => {
    $('.matrix_calc_cost_d1').text(get_cost());
    $('.matrix_calc_cost_btc').text(get_cost('BTC') + ' BTC');
    $('.matrix_calc_cost_eth').text(get_cost('ETH') + ' ETH');
    $('.matrix_calc_cost_usd').text(get_cost('USD') + ' USD');
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
    calc_redraw()
});

$('.matrix_slider').on('moved.zf.slider', function () {
    let val = $('[name="carats"]', this).val();
    $('.slider_step').removeClass('is_active');
    $('.slider_step[data-val="' + val + '"]').addClass('is_active');
    calc_redraw();
});

$('form[action="pick"]').submit(e => {
    e.preventDefault();
    $('#whitelist [name="amount"]').val(get_cost('USD'));
    $('#whitelist [name="amount_currency"] [value="USD"]').prop('selected', true);
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