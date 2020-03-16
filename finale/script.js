// 'use strict';

(function() {
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    function getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    window.multiplyCards = function (elementId, containerId, quantity) {
        // elementId - id of the element being multiplied, //container - is were the copies will land, quantity - is number of objects
        for (i = 0; i < quantity; i++) {
            var card = document.getElementById(elementId).cloneNode(true);
            card.id = card.id+i;
            document.getElementById(containerId).appendChild(card);
        }
        return undefined;
    }
    window.populateCards = function (elementID, emojiList) {
        shuffleArray(emojiList);
        var cardList = Array.from(document.querySelectorAll("."+elementID));
        var colibEmojiList = emojiList.slice(0,cardList.length/2).concat(emojiList.slice(0,cardList.length/2));
        shuffleArray(colibEmojiList);

        for (i = 0; i < cardList.length; i++) {
            var t = document.createTextNode(colibEmojiList[i]);
            document.getElementById(cardList[i].id).appendChild(t);
        }
        return undefined;
    }
}());