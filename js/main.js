document.addEventListener("DOMContentLoaded", () => {
  // creating my game squares
  createSquares();

  // defining my keyboard in js
  const keys = document.querySelectorAll('.keyboard-row button');

  // initializing my guessed words and my tracker for the current box id
  let guessedWords = [[]];
  let availableSpace = 0;

  // defining my secret word
  const secretWordList = ['bleep', 'shove', 'south', 'north', 'stove',
                          'frank', 'opera', 'music', 'shelf', 'shirt',
                          'pitch', 'young', 'brick', 'watch', 'waist',
                          'soggy', 'birch', 'every', 'those', 'knoll',
                          'bread', 'trunk', 'troll', 'house', 'pants',
                          'shoes', 'gruff', 'fruit', 'onion', 'grasp',
                          'glove', 'tweet', 'adore', 'truss', 'count'];

  const secretWord = secretWordList[Math.floor(Math.random() * secretWordList.length)];

  // initializing win and lose checks
  let win = false;
  let lose = false;

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
    if(win || lose) {
      return;
    }
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
      // checking the word
      let winCheck = checkWord(currentWordArray);
      if(winCheck[0] && winCheck[1] && winCheck[2] && winCheck[3] && winCheck[4]) {
        // display win somehow
        console.log('You Win!')
        win = true;
        setTimeout(window.alert, 1500, 'Congratulations! You\'ve won!');
      } else if(guessedWords.length === 6) {
        // display lose
        console.log('You Lose!')
        lose = true;
        window.alert('Sorry, try again tomorrow...')
      } else {
        // new word
        guessedWords.push([]);
      }
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

  // checks a word against the secret word
  function checkWord(wordArray) {
    let check = secretWord.split('');
    let greens = [false,false,false,false,false];
    let yellows = [false,false,false,false,false];
    // green check
    for (let i = 0; i < 5; i++) {
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
      workingEle.classList.add('reveal');
      // need to do something here with the flipping etc
      if(greens[i]) {
        workingEle.classList.add('green');
      } else if(yellows[i]) {
        workingEle.classList.add('yellow');
      } else if(!secretWord.includes(wordArray[i])) {
        const deadKey = document.getElementById(wordArray[i]);
        deadKey.classList.add('dead-key');
      }
      setTimeout(function () {
        workingEle.classList.remove('reveal');
        workingEle.classList.add('revealed');
      }, 700)
      currentSpace ++;
    }
    return greens;
  }


});