'use strict';

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

    function rippleFunc(event) {
        var ripple = document.createElement("span");
        document.getElementsByTagName("BODY")[0].appendChild(ripple);
        ripple.classList.add("ripple");

        console.log(event.clientY, event.clientX);
        ripple.style.top = (event.clientY - 30) + "px";
        ripple.style.left = (event.clientX - 30) + "px";

        ripple.classList.add("active");
        setTimeout(function() {
            ripple.classList.remove("active");
        }, 400);
    }
    window.rippleFlip = function(elementId) {
        var frame = document.getElementById(elementId);

        frame.addEventListener('click', function(event) {
            console.log(event.target.classList);
            if (event.target.classList.contains("emoji-card__face") || event.target.classList.contains("emoji-card__back")) {
                rippleFunc(event);
                var target = document.getElementById(event.target.id);
                var face = document.getElementById(event.target.id).parentElement;
                face.classList.contains("flipped") ? face.classList.remove("flipped") : face.classList.add("flipped");
            }
        })
    }

    window.multiplyCards = function (elementId, containerId, quantity) {
        for (var i = 0; i < quantity; i++) {
            var card = document.getElementById(elementId).cloneNode(true);
            card.id = card.id + "-" + i;
            for (var j = 0, nodeList = card.querySelectorAll("*"); j < nodeList.length; j++) {
                nodeList[j].id = nodeList[j].id + "-" + i;
            }
            document.getElementById(containerId).appendChild(card);
        }
        return undefined;
    }

    window.populateCards = function (elementClass, emojiList) {
        shuffleArray(emojiList);
        var cardList = Array.from(document.querySelectorAll("."+elementClass));
        var colibEmojiList = emojiList.slice(0,cardList.length/2).concat(emojiList.slice(0,cardList.length/2));
        shuffleArray(colibEmojiList);

        for (var i = 0; i < cardList.length; i++) {
            var t = document.createTextNode(colibEmojiList[i]);
            document.getElementById(cardList[i].id).appendChild(t);
        }
        return undefined;
    }
}());