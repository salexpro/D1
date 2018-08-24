const phone_codes = allCountries.map(code => ['+'+code[2], code[1].toUpperCase()]).sort().unique();
const phone_codes_formatted = phone_codes.reduce((all, curr) => `${all}<option value="${curr[0]}" data-code="${curr[1]}">${curr[0]}</option>`, '');
$('#whitelist [name="phone_code"]').html(phone_codes_formatted);

// Detect country trought ip
$.get('https://api.muctool.de/whois', ({
    countryIso
}) => {
    console.log(countryIso);
    $(`#whitelist [name="phone_code"] [data-code="${countryIso}"]`).prop('selected', true)
});

$('form[action="whitelist"]').submit(function(e) {
    e.preventDefault();
    $('button', this).prop('disabled', true);

    const formdata = {
        full_name: $('[name="name"]', this).val(),
        email: $('[name="email"]', this).val(),
        country_of_residence: $('[name="country"]', this).data('code'),
        amount_to_invest: $('[name="amount"]', this).val(),
        phone: $('[name="phone_code"]', this).val() + $('[name="phone"]', this).val()
    };

    $.ajax({
        type: 'PUT',
        url: 'http://master.whitelist-product.staging.c66.me/api/v1/forms/93924c22-2fb8-4c22-a3ac-b2229d0b3029/apply/',
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        data: JSON.stringify(formdata),
        crossDomain: true,
        success: () => {
            open_new('#whitelist', '#success');
            this.reset();
        },
        error: xhr => {
            const messages = xhr.responseJSON.errors.map(err => err.message);
            $('#error .reveal_descr').html(messages.join('<br>'));
            $('#error').foundation('open');
        },
        complete: () => {
            $('button', this).prop('disabled', false);
        }
    })
})

// Countries
// $.get('http://master.whitelist-product.staging.c66.me/api/v1/forms/93924c22-2fb8-4c22-a3ac-b2229d0b3029/', data => {

// })

// const countries = allCountries.reduce((all, country) => {
//     return `${all}<div class="form_field" data-title="${country[0]}">
//             <input type="radio" name="country" id="country_${country[1]}" value="${country[0]}">
//             <label class="form_input" for="country_${country[1]}">
//                 <div class="form_input_icon flag-icon-${country[1]}"></div>
//                 <div class="form_input_label">${country[0]}</div>
//             </label>
//             </div>`
// }, '')

// $('#country .form--choose').append(countries);

$('#country [type="search"]').on('keyup', function () {
    const sch_text = $(this).val().toLowerCase();
    $('#country .form_field').removeClass('hidden');
    $('#country .form_field').each(function(){
        if ($(this).data('title').toLowerCase().substr(0, sch_text.length) !== sch_text) $(this).addClass('hidden');
    })
})

$('form[action="country"] [name="country"]').click(function() {
    const country = $(this).val();
    const country_code = $(this).data('code');
    $('form[action="whitelist"] [name="country"]').val(country).data('code', country_code);
    $(`#whitelist [name="phone_code"] [data-code="${country_code.toUpperCase()}"]`).prop('selected', true);
    $('#country').foundation('close');
});

$('#whitelist [name="amount_currency"]').change(function() {
    $('#whitelist [name="amount"]').val(get_cost($(this).val()));
})