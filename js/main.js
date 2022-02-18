document.addEventListener("DOMContentLoaded", () => {
  // creating my game squares
  createSquares();

  // defining my keyboard in js
  const keys = document.querySelectorAll('.keyboard-row button');

  // initializing my guessed words and my tracker for the current box id
  let guessedWords = [[]];
  let availableSpace = 1;

  // defining the basic keyboard inputs
  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({target}) => {
      const letter = target.getAttribute('data-key');
      updateGuessedWords(letter);
    }
    
  }

  // procures the word the player is currently working on
  function getCurrentWordArray() {
    const numberGuessedWords = guessedWords.length;
    return guessedWords[numberGuessedWords-1];
  }

  // generic update function
  function updateGuessedWords(letter) {
    const currentWordArray = getCurrentWordArray();

    // only want to be adding letters when able or deleting when able
    if((letter !== 'enter' && letter !== 'del' && currentWordArray && 
        currentWordArray.length < 5) ||
        ('del'===letter && currentWordArray.length > 0)){
      if(letter === 'del') {
        currentWordArray.pop();
        availableSpace -= 1;
        const availableSpaceEl = document.getElementById(String(availableSpace));
        availableSpaceEl.textContent = '';
      } else {
        currentWordArray.push(letter);

        const availableSpaceEl = document.getElementById(String(availableSpace));
        availableSpace += 1;

        availableSpaceEl.textContent = letter;
      }
    } else if (letter === 'enter' && currentWordArray.length === 5) {
      // enter handling
      // need to add logic for checking the word
      // start a new line
    }
  }

  // creates my games squares, with id's that are 1 indexed
  function createSquares() {
    const gameBoard = document.getElementById('board');
    for (let i = 0; i < 30; i++) {
      let square = document.createElement('div');
      square.classList.add('square');
      square.setAttribute('id', i + 1);
      gameBoard.appendChild(square);
    }
  }


});