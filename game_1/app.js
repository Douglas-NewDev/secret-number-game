let drawnNumbersList = [];
let limitNumber = 10;

let secretNumber = generateRandomNumber();
let attempts = 1;

// Function to display text on the screen
function displayTextOnScreen(tag, text) {
    let field = document.querySelector(tag);
    field.innerHTML = text;
    responsiveVoice.speak(text, 'UK English Female', { rate: 1.2 });
};

// Function to show the initial message
function showInitialMessage() {
    displayTextOnScreen('h1', 'Secret Number Game');
    displayTextOnScreen('p', 'Choose a number between 1 and 10');
}

showInitialMessage();

// Function to check the player's guess
function checkGuess() {
    let guess = document.querySelector('input').value;

    if (guess == secretNumber) {
        displayTextOnScreen('h1', 'You guessed it!');
        let attemptWord = attempts > 1 ? 'attempts' : 'attempt';
        let attemptsMessage = `You discovered the secret number in ${attempts} ${attemptWord}`;
        displayTextOnScreen('p', attemptsMessage);
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        if (guess > secretNumber) {
            displayTextOnScreen('p', 'The secret number is smaller');
        } else {
            displayTextOnScreen('p', 'The secret number is larger');
        }
        attempts++;
        clearInputField();
    }
};

// Function to generate a random number
function generateRandomNumber() {
    let chosenNumber = parseInt(Math.random() * limitNumber + 1);
    let numberOfElementsInList = drawnNumbersList.length;

    if (numberOfElementsInList == limitNumber) {
        drawnNumbersList = [];
    }
    if (drawnNumbersList.includes(chosenNumber)) {
        return generateRandomNumber();
    } else {
        drawnNumbersList.push(chosenNumber);
        console.log(drawnNumbersList);
        return chosenNumber;
    }
}

// Function to clear the input field
function clearInputField() {
    let guessField = document.querySelector('input');
    guessField.value = '';
}

// Function to restart the game
function restartGame() {
    secretNumber = generateRandomNumber();
    clearInputField();
    attempts = 1;
    showInitialMessage();
    document.getElementById('restart').setAttribute('disabled', true);
}
