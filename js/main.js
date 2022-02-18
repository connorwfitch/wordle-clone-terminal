document.addEventListener("DOMContentLoaded", () => {
  // creating my game squares
  createSquares();

  // defining my keyboard in js
  const keys = document.querySelectorAll('.keyboard-row button');

  // initializing my guessed words and my tracker for the current box id
  let guessedWords = [[]];
  let availableSpace = 0;

  // defining my secret word as an array
  const secretWord = 'frank';

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
      checkWord(currentWordArray);
    }
  }

  // creates my games squares, with id's that are 0 indexed
  function createSquares() {
    const gameBoard = document.getElementById('board');
    for (let i = 0; i < 30; i++) {
      let square = document.createElement('div');
      square.classList.add('square');
      square.setAttribute('id', i);
      gameBoard.appendChild(square);
    }
  }

  function checkWord(wordArray) {
    let check = secretWord.split('');
    let greens = [false,false,false,false,false];
    let yellows = [false,false,false,false,false];
    // green check
    for (let i = 0; i < 5; i++) {
      console.log(wordArray[i],secretWord[i],wordArray[i] === secretWord[i]);
      if (wordArray[i] === secretWord[i]) {
        // remove the letter from check
        const index = check.indexOf(wordArray[i]);
        check.splice(index,1);

        // set greens
        greens[i] = true;
      }
    }
    // yellow check
    for (let i = 0; i < 5; i++) {
      if (check.includes(wordArray[i]) && !greens[i]) {
        // remove the letter from check
        const index = check.indexOf(wordArray[i]);
        check.splice(index, 1);

        // set yellows
        yellows[i] = true;
      }
    }

    // add colors
    let currentSpace = availableSpace - 5;
    for (let i = 0; i < 5; i++) {
      const workingEle = document.getElementById(String(currentSpace));
      if(greens[i]) {
        workingEle.classList.add('green');
      } else if(yellows[i]) {
        workingEle.classList.add('yellow');
      }
      currentSpace ++;
    }
  }


});