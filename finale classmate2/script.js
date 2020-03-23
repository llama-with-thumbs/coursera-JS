'use strict';


function openCards() {
    // Задаем массив и используемыми emoji
    var emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐶', '🐱', '🐭', '🐹', '🐰', '🐻'];
    // Получаем элимент секции с карточками
    var section = document.querySelector('section');
    // Получаем массив "белых" сторон карточек
    var backSides = Array.from(section.querySelectorAll('div.backCard'));
    // Заполняем карточки случайными emoji из их набора
    backSides.forEach(function (item) {
        var emojiPosition = getRandom(0, emojis.length);
        item.innerText = emojis[emojiPosition];
        emojis.splice(emojiPosition, 1);
    });

    // Добавляем событие на клик по краточке
    section.addEventListener('click', clickOnCard);

    // Функция-обработчик клика по карточке
    function clickOnCard(event) {
        // Смотрим, при помощи делегирования, что родитель элемента, на котором произошел клик (одна из сторон карточки) - это div
        if (event.target.parentElement.tagName === 'DIV') {
            var divParentElement = event.target.parentElement;
            // Смотрим, открыта ли уже карточка
            if (divParentElement.classList.contains('show')) {
                divParentElement.classList.remove('show');
                divParentElement.classList.add('unShow');
            }
            // Если карточка закрыта
            else
                // Открываем карточку
                showCard(divParentElement);
        }
    }

    // Функция, открывающая карточку
    function showCard(card){
        if (card.classList.contains('unShow'))
            card.classList.remove('unShow');
        card.classList.add('show');
    }

    // Функция получения целого, псевдослучайного числа
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}