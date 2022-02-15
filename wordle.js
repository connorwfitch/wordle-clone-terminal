// list of possible words -- no peeking!
const wordList = ['clone', 'hedge', 'shave', 'close', 'plant', 'phone'];

// useful functions
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function promptGuess() {
  let guess = window.prompt('Write your guess: \n');
  while(guess.length !== 5) {
    if(guess !== undefined) {
      console.log('Sorry, your guess must be a string of 5 characters');
    }
    guess = window.prompt('Write your guess: \n');
  }
  return guess;
}

// function for running the game itself
function runWordle() {
  console.log('-------------------------------------' +
  '\n \n  Welcome to Connor\'s Wordle clone! \n \n' +
  '-------------------------------------');
}
let i = 1;
while(i<=6) {
  let guess = promptGuess();
  console.log(i);
  i++;
}

// running the game
runWordle();
