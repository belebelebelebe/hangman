var words = [];
words = JSON.parse (localStorage.getItem('words3'))
console.log(words);
var randomNumber = Math.floor(Math.random() * words.length);
var chosen = words[randomNumber];
console.log(chosen)
document.getElementById("wordDisplay").innerHTML = "_ ".repeat(chosen.length);
words.splice(randomNumber, 1)
console.log(words)
localStorage.setItem('words3',JSON.stringify(words))
let attempts = 7;

let maskedWord = "_ ".repeat(chosen.length);
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
console.log(alphabet)
const keyboardDiv = document.querySelector('.keyboard')
alphabet.forEach(letter => {
  const button = document.createElement("button");
  button.textContent = letter.toUpperCase();
  button.addEventListener("click", () => guessLetter(letter, button));
  keyboardDiv.appendChild(button);
});

function guessLetter(guess, button) {
  if (chosen.includes(guess)) {
    revealLetter(guess);
    button.classList.add("correct");
  } else {
    button.classList.add("incorrect");
    attempts = attempts - 1;
    updateHangmanImage();
    document.getElementById("scoreboard").innerHTML = "attempts left: " + attempts;
  }
  if (attempts <= 0) {
    console.log("end game")
    document.getElementById("wordDisplay").innerHTML = "The word was: " + chosen;
    document.getElementById("keyboard").disabled = true;
    disableKeyboard();
  }
}
function disableKeyboard() {
  const buttons = document.querySelectorAll(".keyboard button");
  buttons.forEach(button => {
    button.setAttribute("disabled", "disabled");
  });
}

function updateHangmanImage() {
  let photo = 7 - attempts + 1;
  if (photo <= 7) {
    document.getElementById("hangmanImg").src = "hangman" + (7 - attempts + 1) + ".png";
  }
}

function checkGameStatus() {
  if (!maskedWord.includes("_")) {
    document.getElementById("wordDisplay").innerHTML = "you win! the word was: " + chosen;
    disableKeyboard();
  }
}

function revealLetter(letter) {
  let displayWord = "";
  for (let i = 0; i < chosen.length; i++) {
    if (chosen[i] == letter) {
      displayWord = displayWord + letter + " ";
    } else {
      displayWord = displayWord + maskedWord[i * 2] + " ";
    }
  }
  maskedWord = displayWord;
  document.getElementById("wordDisplay").innerHTML = displayWord;
  checkGameStatus();
}