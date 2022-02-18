document.addEventListener("DOMContentLoaded", () => {
  createSquares();

  const keys = document.querySelectorAll('.keyboard-row button');
  let guessedWords = [[]];
  let availableSpace = 1;

  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({target}) => {
      const letter = target.getAttribute('data-key');
      updateGuessedWords(letter);
    }
    
  }

  function getCurrentWordArray() {
    const numberGuessedWords = guessedWords.length;
    return guessedWords[numberGuessedWords-1];
  }

  function updateGuessedWords(letter) {
    const currentWordArray = getCurrentWordArray();

    if(currentWordArray && currentWordArray.length < 5 ||
       'enterdel'.includes(letter) && availableSpace>1) {
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
    }
  }

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