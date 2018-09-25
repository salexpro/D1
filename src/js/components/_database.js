// Retrieve filter's data
$.get('http://oxygen.ws/api.php?getalldata=1', data => {
    Object.keys(data).forEach(item => {
        const options = data[item].reduce((html, opt) => `${html}<option value="${opt}">${opt}</option>`, '<option value="">--</option>');
        $(`form[action="filter"] [name="${item.toLowerCase()}"]`).html(options).prop('disabled', false);
    })
})

// Get diamond data
const table_data = {
    'Weight': 'Weight',
    'Shape': 'Shape',
    'Color': 'Color',
    'Clarity': 'Clarity',
    'Polish': 'Polish',
    'SYM': 'SYM',
    'Certificate_No': 'GIA certificate',
    'D1_Price': 'D1 Price',
    'Reservation of diamonds': 'Reservation of diamonds'
}
const table_header = `<tr>${Object.values(table_data).reduce((tr, th) => `${tr}<th>${th}</th>`, '')}</tr>`;
const table_refresh = content => {$('.reveal_results .table').html(table_header + content)};
const form_search = (curr_page = 1) => {
    $('[type="submit"]', form).prop('disabled', true);
    const form = Foundation.MediaQuery.atLeast('medium') ? $('#database form[action="filter"]') : $('#filters form[action="filter"]');
    let table_content = '<tr><td colspan="9" data-title="Loading..."><span class="table_cell">Loading...</span></td></tr>';
    table_refresh(table_content);
    $.ajax({
        type: 'GET',
        url: `http://oxygen.ws/api.php?page=${curr_page}`,
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        data: $(form).serialize(),
        crossDomain: true,
        success: data => {
            // Generating table
            const items = data.data;
            const pages = data.pages;
            table_content = items.length ? items.reduce((html, el) =>
                `${html}<tr>${Object.keys(table_data).reduce((elhtml, elkey) =>
                    elhtml + `<td data-title="${table_data[elkey]}"><span class="table_cell">${(elkey == 'Certificate_No') ? `<a href="https://www.gia.edu/report-check?reportno=${el[elkey]}" target="_blank">${el[elkey]}</a>` : typeof (el[elkey]) != 'undefined' ? el[elkey] : '<button class="button" data-open="reservation">Buy</button>'}</span></td>`, '')}</tr>`, '') : '<tr><td colspan="9" data-title="Nothing found"><span class="table_cell">Nothing found</span> </td></tr>';
            table_refresh(table_content);

            // Generating pager
            const page = (state, id) => state ? `<li class="current"><span class="show-for-sr">You're on page</span> ${id}</li>`: `<li><a href="#" aria-label="Page ${id}" data-page="${id}">${id}</a></li>`;
            const pager = () => {
                let html = '';
                if (items.length && pages > 1) {
                    html += (curr_page != 1) ? `<li class="pagination-previous"><a href="#" aria-label="Previous page" data-page="${curr_page - 1}">Previous <span class="show-for-sr">page</span></a></li>` : '<li class="pagination-previous disabled">Previous <span class="show-for-sr">page</span></li>';
                    if (pages > 10) {
                        if(curr_page > 5 && curr_page < (pages - 4)){
                            for (let i = 1; i < (curr_page - 3); i++) {
                                if (i > 5) break;
                                html += page(curr_page == i, i);
                            }
                            html += '<li class="ellipsis"></li>';
                            for (let i = (curr_page - 1); i <= (curr_page + 1); i++) {
                                html += page(curr_page == i, i);
                            }
                            html += '<li class="ellipsis"></li>';
                            for (let i = (curr_page + 4); i <= pages; i++) {
                                html += (i > (pages - 5)) ? page(curr_page == i, i) : '';
                            }
                        } else {
                            for (let i = 1; i <= 5; i++) {
                                html += page(curr_page == i, i);
                            }
                            html += '<li class="ellipsis"></li>';
                            for (let i = (pages - 4); i <= pages; i++) {
                                html += page(curr_page == i, i);
                            }
                        }
                    } else {
                        for (let i = 1; i <= pages; i++) {
                            html += page(curr_page == i, i);
                        }
                    }
                    html += (curr_page != pages) ? `<li class="pagination-next"><a href="#" aria-label="Next page" data-page="${curr_page + 1}">Next <span class="show-for-sr">page</span></a></li>` : '<li class="pagination-next disabled">Next <span class="show-for-sr">page</span></li>';
                }
                return html;
            }
            $('.reveal_results .pagination').html(pager());
        },
        error: xhr => {
            // const messages = xhr.responseJSON.errors.map(err => err.message);
            $('#error .reveal_descr').html(xhr.responseText);
            $('#error').foundation('open');
            table_refresh('<tr><td colspan="9" data-title="Press search to get diamond list."><span class="table_cell">Press search to get diamond list.</span> </td></tr>');
            $('.reveal_results .pagination').html('');
        },
        complete: () => {
            $('#filters').foundation('close');
            $('button', form).prop('disabled', false);
        }
    });
    return false;
}

const form_reset = () => {
    table_refresh('<tr><td colspan="9" data-title="Press search to get diamond list."><span class="table_cell">Press search to get diamond list.</span> </td></tr>');
    $('.reveal_results .pagination').html('');
}

// Pagination
$('.pagination').on('click', 'a', function() { 
    form_search($(this).data('page'));
});