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
        1024: {
            items: 4
        },
        1170: {
            margin: 118,
            autoWidth: true
        }
    }
});

$('.advisors_items').owlCarousel({
    nav: true,
    items: 1,
    margin: 20,
    navText: ['', '']
});

$('.roadmap_items').owlCarousel({
    nav: true,
    navText: ['', ''],
    // autoHeight: true,
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
    },
    onInitialized: (e) => {
        setTimeout(() => {
            $(e.target).trigger('to.owl.carousel', [6, 1]);
        }, 0);
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