let currentRowNo = 1;
let guessesLeft = 5;
let gameRunning = true;

const letterKeys = document.querySelectorAll(".letter");
const enterKey = document.querySelector(".enter-key");
const deleteKey = document.querySelector(".del-key");
const tiles = document.querySelectorAll(".tile")

// <========== EVENT LISTENERS ==========>
letterKeys.forEach(letter => letter.addEventListener("click", (e) => {
    addLetter(e.target.innerText)
}));
enterKey.addEventListener("click", guessWord);

deleteKey.addEventListener("click", deleteLastLetter);

document.addEventListener("keyup", (e) => {
    let keyPressed = e.key;
    if (keyPressed === "Enter"){
        guessWord();
    }
    if (keyPressed === "Backspace"){
        deleteLastLetter();
    }
    if (keyPressed.length > 1) return;
    if (/[a-z]/i.test(keyPressed)) {
        addLetter(keyPressed.toUpperCase())
      }
})

// <========== FUNCTIONS ==========>
// Function adds a letter to first empty tile in a row
function addLetter(key){
    if (!gameRunning) return;
    // If guessesLeft = 0, user has spelled a 5-letter word. Stop them entering any more.
    if (guessesLeft === 0) return; 
    // Otherwise, find the current row.
    const activeRow = document.querySelectorAll(`[data-row-no="${currentRowNo}"]`);
    // Then find first empty tile.
    const activeLetter = activeRow.length - guessesLeft;
    // Then insert letter to that tile.
    activeRow[activeLetter].textContent = key;
    // Reduce the number of guesses the user has left.
    guessesLeft -= 1;
}

// Function submits the user's guess
function guessWord(){
    if (!gameRunning) return;
    // Find out what the user's guess is by calling getCurrentGuess().
    const userGuess = getCurrentGuess();
    // If guess is less than five letters, don't accept it. 
    if (userGuess.length < 5) {
        alert("Your guess must be five letters!");
        return;
    }
    // If more than five letters, accept.
    alert (`You guessed "${userGuess}"`);

    // <------------ PLACEHOLDER ------------>
    // [Call function to check whether guess is in dictionary.]
    // [If word is in dictionary, compare it against the secret word.]
    // [if user has successfully guessed the word, end game]
    // <------------------------------------>


    // Go to next row and reset number of guesses
    currentRowNo += 1;
    guessesLeft = 5;
    // If there are no more rows, end the game.
    if (currentRowNo === 7) gameOver();

    // Highlight which row the user is currently on.
    tiles.forEach(tile => {
        tile.dataset.status="inactive"
    });
    const activeRow = document.querySelectorAll(`[data-row-no="${currentRowNo}"]`);
    activeRow.forEach(tile => {
        tile.dataset.status="active"
    })
}

function getCurrentGuess(){
    // Find the current row.
    const activeRow = document.querySelectorAll(`[data-row-no="${currentRowNo}"]`);
    // Loop through the row to find the word that the user guessed.
    let guess = "";
    for (let i = 0; i < activeRow.length; i++){
        guess += activeRow[i].innerText;
    }
    return guess;
}

// Function deletes the last letter in the row
function deleteLastLetter(){
    if (!gameRunning) return;
    // Find the current row.
    const activeRow = document.querySelectorAll(`[data-row-no="${currentRowNo}"]`);
    // Find the current guess
    const currentWord = getCurrentGuess();
    // Find out which tile the last letter is in
    const lastLetterIndex = currentWord.length - 1;
    // If no letters have been added to the current row yet, do nothing
    if (lastLetterIndex < 0) return;
    // Otherwise, clear the tile's content.
    activeRow[lastLetterIndex].textContent = "";
    // Add a guess back
    guessesLeft += 1;
}

function gameOver(){
    gameRunning = false;
    // alert("You've used up all your guesses")
}