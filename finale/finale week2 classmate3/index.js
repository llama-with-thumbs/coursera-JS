
let shuffle = function (array)
{
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

};

const COUNT_OF_SAME_CARDS = 2;
const USED_EMOJI = ["🐶", "🐰", "🐓", "🐭", "🐹", "🐱"];
let cards_indexes = [];

for (let i = 0, len = USED_EMOJI.length; i < len; i++)
{
    for (let j = 0, len2 = COUNT_OF_SAME_CARDS; j < len2; j++)
    {
        cards_indexes.push(i);
    }
}

shuffled_indexes = shuffle(cards_indexes.slice());

setTimeout(() => {
    this.setValuesOfCards();
    this.addingListeners();
});

function setValuesOfCards()
{
    let tagsWithText = document.querySelectorAll(".back-card > p");
    console.log(tagsWithText);
    for (let i = 0, len = tagsWithText.length; i < len; i++)
    {
        tagsWithText[i].innerText = USED_EMOJI[shuffled_indexes[i]];
    }
}

let gameInfo = {currentCards: []};

function addingListeners()
{
    let gameField = document.getElementById("game-field");
    gameField.addEventListener("click", function(event)
    {
        event.stopPropagation();
        let target = event.target;
        let card = undefined;
        if (target.tagName === 'p')
        {
            card = target.parentNode.parentNode;
        }
        else
        {
            card = target.parentNode;
        }

        if (card.classList.contains('blocked'))
        {
            return;
        }

        if (card.className === "card")
        {
            card.classList.add("rotated");
        }
        else if (card.className === "card rotated")
        {
            card.classList.remove("rotated");
        }
        else
        {
            return;
        }

        console.log(gameInfo);

        if (gameInfo.currentCards.length === 0)
        {
            gameInfo.currentCards.push(card);
        }
        else if (gameInfo.currentCards.length === 1)
        {
            if (gameInfo.currentCards[0].dataset.id === card.dataset.id)
            {
                gameInfo.currentCards.pop();
            }
            else if (gameInfo.currentCards[0].innerText === card.innerText)
            {
                gameInfo.currentCards[0].classList.add("blocked");
                card.classList.add("blocked");
                gameInfo.currentCards.splice(0, gameInfo.currentCards.length);
            }
            else
            {
                gameInfo.currentCards[0].classList.add("wrong");
                card.classList.add("wrong");
                gameInfo.currentCards.push(card);
            }
        }
        else
        {
            for (let i = 0; i < gameInfo.currentCards.length; i++)
            {
                gameInfo.currentCards[i].classList.remove('wrong');
                if (gameInfo.currentCards[i].dataset.id !== card.dataset.id)
                {
                    gameInfo.currentCards[i].classList.remove('rotated');
                    gameInfo.currentCards.splice(i, 1);
                    i--;
                }
            }

            if (gameInfo.currentCards.length === 0)
            {
                gameInfo.currentCards.push(card);
            }
        }
    }, true);
}
