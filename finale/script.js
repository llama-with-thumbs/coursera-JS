'use strict';
class EmojiCard {
    open = false;
    active = true;
    deactivate;

    domElement;
    emoji;
    domCardFace;
    cardId;

    constructor(domElement) {
        this.domElement = domElement;
        this.cardId = domElement.id;
    }
}
class GameBord {
    allCards = {};
    openCards = {};

    greenCards = {};
    redCards = {};

    constructor (gameBordId, emojiConClass, quantity, cardDeck, setShield) {
        this.multiplyCards(gameBordId, quantity);
        this.placeEmoji(cardDeck, emojiConClass);

        setShield(gameBordId); // creats transperent lear behiend the bord;
    }
    
    makeGreen (openCards, greenCards) {
        // console.log("running makeGreen");
        // console.log(openCards);
        Object.keys(openCards).forEach(function(cardId) {
            if(openCards[cardId].active) {
                openCards[cardId].domCardFace.style.backgroundColor = "#5AD66F";
                openCards[cardId].domCardFace.style.borderColor = "#5AD66F";
                openCards[cardId].active = false;

                greenCards[cardId] = openCards[cardId];
                delete openCards[cardId];
            }
        })
    }
    makeRed (openCards, redCards) {
        // console.log("runnign makeRed");
        Object.keys(openCards).forEach(function(cardId) {
            if(openCards[cardId].active) {
                openCards[cardId].domCardFace.style.backgroundColor = "#F44336";
                openCards[cardId].domCardFace.style.borderColor = "#F44336";
                openCards[cardId].active = true;

                redCards[cardId] = openCards[cardId];
                delete openCards[cardId];
            }
        })
    }
    makeWhite (card) {
        card.domCardFace.style.backgroundColor = "white";
        card.domCardFace.style.borderColor = "white";
        card.active = true;
    }
    open (card) {
        // console.log("running open(card)");

        card.open = true;
        card.domCardFace.parentElement.classList.add("flipped");
        this.openCards[card.cardId] = card;

        var cardIdList = Object.keys(this.openCards);
        var redCardIdList = Object.keys(this.redCards);
        
        // console.log("cardIdList.length", cardIdList.length);

        if (cardIdList.length == 2 && redCardIdList.length == 0) {
            if(this.openCards[cardIdList[0]].emoji != this.openCards[cardIdList[1]].emoji) {
                // console.log("starting make red");
                // console.log(this.openCards[cardIdList[0]].emoji, this.openCards[cardIdList[1]].emoji);
                this.makeRed(this.openCards, this.redCards);
            } else {
                // console.log("starting make green");
                // console.log(this.openCards[cardIdList[0]].emoji, this.openCards[cardIdList[1]].emoji);
                this.makeGreen(this.openCards, this.greenCards);
            }
            
            // console.log("openCards", this.openCards);
            // console.log("redCards", this.redCards);
            // console.log("greenCards", this.greenCards);

        } else if (redCardIdList.length != 0) {
            // console.log("running close redCards");
            this.close();
            card.open = true;
            card.domCardFace.parentElement.classList.add("flipped");
            this.openCards[card.cardId] = card;

        }
        // console.log("swiched after if");
        // console.log(this.openCards);
    }
    close () {
        // console.log("runing close(card)");
        for (var i = 0, cardIdList = Object.keys(this.openCards); i < cardIdList.length; i++) {
            // console.log("FOR for openCards");

            this.openCards[cardIdList[i]].domCardFace.parentElement.classList.remove("flipped");
            this.openCards[cardIdList[i]].open = false;
            this.makeWhite(this.openCards[cardIdList[i]]);
            delete this.openCards[cardIdList[i]];   
        }

        for (var i = 0, cardIdList = Object.keys(this.redCards); i < cardIdList.length; i++) {
            // console.log("FOR for redCards");

            this.redCards[cardIdList[i]].domCardFace.parentElement.classList.remove("flipped");
            this.redCards[cardIdList[i]].open = false;
            this.makeWhite(this.redCards[cardIdList[i]]);
            delete this.redCards[cardIdList[i]];   
        }

        // console.log("open cards", this.openCards);
        // console.log("open red cards", this.redCards);
        // console.log("open green cards", this.greenCards);
        // console.log("exit from close(card)");
    }

    flip (card) {
        if (card.open && card.active) {
            // console.log("run close(card)");
            this.close(card);
        } else if (!card.open && card.active) {
            // console.log("run open(card)")
            this.open(card);
        } 
    }

    multiplyCards (gameBordId, quantity) {
        for (var i = 0; i < quantity; i++) {
            var card = document.getElementById(gameBordId).firstElementChild.cloneNode(true);
            card.id = card.id + "-" + i;
            this.allCards[card.id] = new EmojiCard(card);
            for (var j = 0, nodeList = card.querySelectorAll("*"); j < nodeList.length; j++) {
                nodeList[j].id = nodeList[j].id + "-" + i;
                nodeList[j].dataset.card = card.id;
            }
            document.getElementById(gameBordId).appendChild(card);
        }
        document.getElementById(gameBordId).firstElementChild.remove();
    }

    placeEmoji (cardDeck, emojiConClass) {
        var selectedEmoji = shuffleArray(cardDeck).slice(0, Object.keys(this.allCards).length / 2);
        selectedEmoji = selectedEmoji.concat(selectedEmoji);
        
        shuffleArray(selectedEmoji);
        
        for (var i = 0; i < Object.keys(this.allCards).length; i++) {
            var card = this.allCards[Object.keys(this.allCards)[i]];
            card.emoji = selectedEmoji[i];
            card.domCardFace = card.domElement.querySelector("." + emojiConClass);
            card.domCardFace.appendChild(document.createTextNode(card.emoji));

            // console.log(card.emoji, i);
            card.domElement.addEventListener("click", function(event) {
                if (event.target.className != "emoji-card") {
                    bord.flip(bord.allCards[event.target.dataset.card]);
                }                
            });
        }
    }
}

var bord;
function setGame(bordId, emojiConClass, cardCount, cardDeck) {

    function setShield(shieldedElementId){
        let shield = document.createElement("DIV");
        let domRect = document.getElementById(shieldedElementId).getBoundingClientRect()
        shield.style.width = domRect.width + "px";
        shield.style.height = domRect.height + "px";
        shield.style.position = "absolute";
        shield.style.left = domRect.x + "px";
        shield.style.top = domRect.y + "px";
        shield.style.backgroundColor = "green";
        shield.style.zIndex  = "-1";
        document.body.appendChild(shield).classList.add("shield");

        function changeDepth(){
            console.log(shield.style.zIndex);
            if (shield.style.zIndex < 0) {
                shield.style.zIndex = "1";
            } else {
                shield.style.zIndex = "-1";
            }
        }
        document.body.addEventListener("click", changeDepth);

        function reportWindowSize() {
            console.log("resize");
          }  
        window.onresize = reportWindowSize;
    }
    
    bord = new GameBord(bordId, emojiConClass, cardCount, cardDeck, setShield);

    function setTimer(elementClass) {
        var timer = document.createElement("H3");
        var time = document.createTextNode("00:60");
        timer.appendChild(time);
        document.body.appendChild(timer).classList.add("timer");
        return undefined;
    }
    setTimer("body");

    return undefined;
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



