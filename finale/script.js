'use strict';
class EmojiCard {
    open = false;
    active = true;
    domElement;
    emoji;
    domCardFace;
    cardId;

    constructor(domElement) {
        this.domElement = domElement;
        this.cardId = domElement.id;
        // console.log(this.cardId);
    }
}
class GameBord {
    cardList = {};
    openCards = {};

    greenCards = {};
    redCards = {};

    constructor (gameBordId, emojiConClass, quantity, cardDeck) {
        this.multiplyCards(gameBordId, quantity);
        this.placeEmoji(cardDeck, emojiConClass);
    }
    makeGreen (card1, card2, openCards) {
        card1.domCardFace.style.backgroundColor = "green";
        card1.domCardFace.style.borderColor = "green";
        card1.active = false;

        card2.domCardFace.style.backgroundColor = "green";
        card2.domCardFace.style.borderColor = "green";
        card2.active = false;

        delete openCards[card1.emoji];
        console.log(openCards);
    }
    makeRed (openCards) {
        Object.keys(openCards).forEach(function(emoji) {
            if(openCards[emoji].active) {
                openCards[emoji].domCardFace.style.backgroundColor = "red";
                openCards[emoji].domCardFace.style.borderColor = "red";
                openCards[emoji].active = true;
            }
        })
    }
    makeWhite (card) {
        card.domCardFace.style.backgroundColor = "white";
        card.domCardFace.style.borderColor = "white";
        card.active = true;
    }
    open (card) {
        card.open = true;
        card.domCardFace.parentElement.classList.add("flipped");
        // this.addCard(card);
        if (this.openCards.hasOwnProperty(card.emoji) && Object.keys(this.openCards).length == 1) {
            this.makeGreen(card, this.openCards[card.emoji], this.openCards);
            
        } else if (Object.keys(this.openCards).length == 0) {
            this.openCards[card.emoji] = card;
        } else if (Object.keys(this.openCards).length == 1) {
            this.openCards[card.emoji] = card;
            this.makeRed(this.openCards);
        } else {
            for (var i = 0, emojiList = Object.keys(this.openCards); i < emojiList.length; i++) {
                console.log(emojiList[i], i);
                this.close(this.openCards[emojiList[i]]);
                // console.log("this case");   
                // this.openCards[card.emoji] = card;
            }
        }

        console.log(this.openCards);

    }
    close (card) {
        card.domCardFace.parentElement.classList.remove("flipped");
        card.open = false;
        delete this.openCards[card.emoji];
        this.makeWhite(card);
        console.log(this.openCards);
    }

    flip (card) {
        if (card.open && card.active) {
            this.close(card);
        } else if (!card.open && card.active) {
            this.open(card);
        } else if (card.open && !card.active) {
            console.log("card green");
        } else {
            console.log("came card");
        }
    }

    
    multiplyCards (gameBordId, quantity) {
        for (var i = 0; i < quantity; i++) {
            var card = document.getElementById(gameBordId).firstElementChild.cloneNode(true);
            card.id = card.id + "-" + i;
            this.cardList[card.id] = new EmojiCard(card);
            for (var j = 0, nodeList = card.querySelectorAll("*"); j < nodeList.length; j++) {
                nodeList[j].id = nodeList[j].id + "-" + i;
                nodeList[j].dataset.card = card.id;
            }
            document.getElementById(gameBordId).appendChild(card);
        }
        document.getElementById(gameBordId).firstElementChild.remove();
    }
    placeEmoji (cardDeck, emojiConClass) {
        var selectedEmoji = shuffleArray(cardDeck).slice(0, Object.keys(this.cardList).length / 2);
        selectedEmoji = selectedEmoji.concat(selectedEmoji);
        
        shuffleArray(selectedEmoji);
        
        for (var i = 0; i < Object.keys(this.cardList).length; i++) {
            var card = this.cardList[Object.keys(this.cardList)[i]];
            card.emoji = selectedEmoji[i];
            card.domCardFace = card.domElement.querySelector("." + emojiConClass);
            card.domCardFace.appendChild(document.createTextNode(card.emoji));

            console.log(card.emoji, i);
            card.domElement.addEventListener("click", function(event) {
                bord.flip(bord.cardList[event.target.dataset.card]);
            });
        }
    }
}


var bord;
function setGame(bordId, emojiConClass, cardCount, cardDeck) {
    bord = new GameBord(bordId, emojiConClass, cardCount, cardDeck);
}


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
