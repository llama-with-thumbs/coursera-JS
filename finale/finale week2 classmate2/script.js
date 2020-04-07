(function () {
    class Card {
        constructor(value, card, callback) {
            this.value = value;
            this.card = card;
            this.top = this.card.querySelector('.card__top');
            this.makeWhite();
            this.back = this.card.querySelector('.card__back');
            this.symbol = this.card.querySelector('.card__top__symbol');
            this.rotateForbidden = false;
            this.opened = false;

            this.card.addEventListener('animationstart', this.animationStart.bind(this), false);
            this.card.addEventListener('animationend', this.animationEnd.bind(this), false);

            this.card.addEventListener('click', this.clickHandler.bind(this), false);

            this.callback = callback;
        }

        animationStart() {
            this.rotateForbidden = true;
        }

        animationEnd() {
            if (!this.opened) {
                this.symbol.innerHTML = '';
                this.rotateForbidden = false;
            }
        }

        clickHandler() {
            if (this.rotateForbidden) {
                return;
            }
            if (this.opened) {
                this.closeCard();
            } else {
                this.openCard();
            }

        }

        closeCard() {
            this.card.classList.remove('animation_forward');
            this.card.classList.add('animation_backward');
            this.showBack();
            this.opened = false;
            this.rotateForbidden = false;
        }

        openCard() {
            this.card.classList.remove('animation_backward');
            this.card.classList.add('animation_forward');
            this.showTop();
            this.symbol.innerHTML = this.value;
            this.opened = true;
            this.rotateForbidden = true;
            this.makeWhite();
            this.callback(this);
        }

        makeGreen() {
            this.removeColors();
            this.top.classList.add('right_color');
        }

        makeRed() {
            this.removeColors();
            this.top.classList.add('wrong_color');
        }

        makeWhite() {
            this.removeColors();
            this.top.classList.add('neutral_color');
        }

        removeColors() {
            this.top.classList.remove('wrong_color');
            this.top.classList.remove('right_color');
            this.top.classList.remove('neutral_color');
        }

        clearTopAndBack() {
            this.top.classList.remove('disappear');
            this.back.classList.remove('appear');
            this.back.classList.remove('disappear');
            this.top.classList.remove('appear');
        }

        showTop() {
            this.clearTopAndBack();
            this.top.classList.add('appear');
        }

        showBack() {
            this.clearTopAndBack();
            this.back.classList.add('appear');
        }

    }

    class Game {
        constructor(typesCount) {
            this.types = ['🐱', '🐯', '🦁', '🐸', '🐞', '🐊', '🐶', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐮', '🐷', '🐙', '🐵', '🦄', '🦀', '🐟', '🐓', '🦃', '🐿'];
            this.typesUsed = typesCount;
            this.cards = [];
            this.openedCards = [];

            this.createHtmlElements();
            this.create();
        }

        getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        shuffleEmojies() {
            let emojiesList = [];
            let typesUsed = [];
            for (let i = 0; i < this.typesUsed; ++i) {
                typesUsed[i] = 0;
            }
            for (let i = 0; i < this.typesUsed * 2; ++i) {
                let k = this.getRandomInt(this.typesUsed);
                while (typesUsed[k] > 1) {
                    k = this.getRandomInt(this.typesUsed);
                }
                typesUsed[k]++;
                emojiesList[i] = this.types[k];
            }
            return emojiesList;
        }

        create() {
            let emojiesList = this.shuffleEmojies();
            let allCards = document.querySelectorAll('.card');
            for (let i = 0; i < allCards.length; ++i) {
                this.cards.push(new Card(emojiesList[i], allCards[i], this.checkAllCards.bind(this)));
            }
        }

        checkAllCards(card) {
            if (this.openedCards.length === 1) {
                if (this.openedCards[0].value === card.value) {
                    this.openedCards[0].makeGreen();
                    card.makeGreen();
                    this.openedCards = [];
                } else {
                    this.openedCards[0].makeRed();
                    card.makeRed();
                    this.openedCards.push(card);
                }
                return;
            }
            for (let eachCard of this.openedCards) {
                eachCard.closeCard();
            }
            this.openedCards = [];
            this.openedCards.push(card);
        }

        createHtmlElements() {
            let section = document.querySelector('.main_section');
            for (let i = 0; i < this.typesUsed * 2; ++i) {
                let card = document.createElement('div');
                card.classList.add('card');
                let back = document.createElement('div');
                back.classList.add('card__back');
                let top = document.createElement('div');
                top.classList.add('card__top');
                let symbol = document.createElement('div');
                symbol.classList.add('card__top__symbol');
                top.appendChild(symbol);
                card.appendChild(back);
                card.appendChild(top);
                section.appendChild(card);
            }
        }
    }

    window.prepareForm = function () {
        new Game(6);
    };
})();