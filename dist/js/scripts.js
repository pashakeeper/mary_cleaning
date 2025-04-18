$(document).ready(function () {
    const languages = [
        {value: 'en', img: '../img/flag-gb.svg', alt: 'English'},
        {value: 'en', img: '../img/flag-gb.svg', alt: 'Spanish'},
    ];

    $('.language, .language_mobile').each(function () {
        const $language = $(this);
        const $hiddenInput = $language.find('input[type="hidden"]');

        const $selected = $(`<div class="language__selected"><img src="${languages[0].img}" alt="${languages[0].alt}"></div>`);
        const $options = $('<div class="language__options"></div>');

        languages.forEach(lang => {
            const $option = $(`
                <div class="language__option" data-value="${lang.value}" title="${lang.alt}">
                    <img src="${lang.img}" alt="${lang.alt}">
                </div>
            `);
            $options.append($option);
        });

        $language.append($selected);
        $language.append($options);

        $selected.on('click', function (e) {
            e.stopPropagation();
            $(this).parent().toggleClass('active');
            $options.fadeToggle();
            $('.language__options').not($options).fadeOut();
        });

        $options.on('click', '.language__option', function () {
            const $option = $(this);
            const value = $option.data('value');
            const imgSrc = $option.find('img').attr('src');
            const imgAlt = $option.find('img').attr('alt');

            $selected.html(`<img src="${imgSrc}" alt="${imgAlt}">`);
            $hiddenInput.val(value);

            $options.find('.language__option').removeClass('selected');
            $option.addClass('selected');

            $options.fadeOut();
        });

        $(document).on('click', function () {
            $options.fadeOut();
        });
        $language.on('click', function (e) {
            e.stopPropagation();
        });
        if (languages.length > 0) {
            $hiddenInput.val(languages[0].value);
            $options.find('.language__option').first().addClass('selected');
        }
    });
    $(".burger").click(function () {
        $(".mobile-menu").toggleClass("active");
        $(this).toggleClass("open");
    });
});