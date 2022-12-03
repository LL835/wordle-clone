let currentRowNo = 1;
let guessesLeft = 5;

const letterKeys = document.querySelectorAll(".letter");
const enterKey = document.querySelector(".enter-key");
const deleteKey = document.querySelector(".del-key");

// <========== EVENT LISTENERS ==========>
letterKeys.forEach(letter => letter.addEventListener("click", (e) => {
    addLetter(e.target.innerText)
}));
enterKey.addEventListener("click", guessWord);
deleteKey.addEventListener("click", deleteLastLetter);

// <========== FUNCTIONS ==========>
// Function adds a letter to first empty tile in a row
function addLetter(key){
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

function guessWord(){
// Code to submit user's guess
    
}

function deleteLastLetter(){
// Code to delete last letter goes here;
}