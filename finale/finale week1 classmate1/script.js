function playMemoji({gameBoardId}) {
  const gameBoard = document.getElementById(gameBoardId);
  const cardsElements = gameBoard.getElementsByClassName('playing-card');
  console.log(cardsElements);
  Array.from(cardsElements).forEach(card => {
    card.addEventListener('click', (event) => {
      card.classList.toggle('playing-card_flip');
    }, false);
  });
}