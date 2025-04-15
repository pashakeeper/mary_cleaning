$(document).ready(function () {
    const languages = [
        {value: 'en', img: '/img/flag-gb.svg', alt: 'English'},
        {value: 'es', img: '/img/flag-gb.svg', alt: 'Spanish'},
        {value: 'fr', img: '/img/flag-gb.svg', alt: 'French'},
        {value: 'de', img: '/img/flag-gb.svg', alt: 'German'},
        {value: 'zh', img: '/img/flag-gb.svg', alt: 'Chinese'}
    ];

    const $language = $('.language');
    const $hiddenInput = $language.find('input[type="hidden"]');

    // Создаем выбранный элемент с первым флагом
    const $selected = $(`<div class="language__selected"><img src="${languages[0].img}" alt="${languages[0].alt}"></div>`);
    const $options = $('<div class="language__options"></div>');

    // Добавляем опции
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

    // Обработчики событий
    $selected.on('click', function(e) {
        e.stopPropagation();
        $options.toggle();
        $('.language__options').not($options).hide();
    });

    $options.on('click', '.language__option', function() {
        const $option = $(this);
        const value = $option.data('value');
        const imgSrc = $option.find('img').attr('src');
        const imgAlt = $option.find('img').attr('alt');

        // Обновляем выбранное значение
        $selected.html(`<img src="${imgSrc}" alt="${imgAlt}">`);
        $hiddenInput.val(value);

        // Обновляем выделение
        $options.find('.language__option').removeClass('selected');
        $option.addClass('selected');

        $options.fadeOut();
    });

    // Закрываем при клике вне селекта
    $(document).on('click', function() {
        $options.fadeOut();
    });

    // Предотвращаем закрытие при клике внутри селекта
    $language.on('click', function(e) {
        e.stopPropagation();
    });

    // Устанавливаем первое значение по умолчанию
    if (languages.length > 0) {
        $hiddenInput.val(languages[0].value);
        $options.find('.language__option').first().addClass('selected');
    }
});