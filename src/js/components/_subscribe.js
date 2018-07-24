$('form[action="subscribe"]').submit(e => {
    e.preventDefault();
    $('#success').foundation('open');
})