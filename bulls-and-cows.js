// Import the prompt-sync module
const prompt = require('prompt-sync')({ sigint: true });

// Function to generate a secret number with 4 unique digits
function generateSecretNumber() {
    let digits = [];
    while (digits.length < 4) {
        let digit = Math.floor(Math.random() * 10);
        if (!digits.includes(digit)) {
            digits.push(digit);
        }
    }
    return digits.join('');
}

// Function to validate the user's input
function isValidGuess(guess) {
    if (guess.length !== 4) {
        console.log('Your guess must be a 4-digit number.');
        return false;
    }
    if (!/^\d+$/.test(guess)) {
        console.log('Your guess must only contain digits.');
        return false;
    }
    let digits = guess.split('');
    let uniqueDigits = new Set(digits);
    if (uniqueDigits.size !== 4) {
        console.log('All digits must be unique.');
        return false;
    }
    return true;
}

// Function to calculate bulls and cows
function getBullsAndCows(secret, guess) {
    let bulls = 0;
    let cows = 0;
    for (let i = 0; i < secret.length; i++) {
        if (guess[i] === secret[i]) {
            bulls++;
        } else if (secret.includes(guess[i])) {
            cows++;
        }
    }
    return { bulls, cows };
}

// Function to get the player's name
function getPlayerName() {
    let name = prompt('Enter your name: ').trim();
    if (name === '') {
        name = 'Player';
    }
    return name;
}

// Main game function
function playGame() {
    console.log('Welcome to Bulls and Cows!');
    const playerName = getPlayerName();
    let playAgain = false;
    let gameNumber = 0;
    let attemptsHistory = [];

    do {
        gameNumber++;
        const secretNumber = generateSecretNumber();
        // Uncomment the next line to see the secret number (for debugging purposes)
        // console.log(`Secret number (for debugging): ${secretNumber}`);
        let attempts = 0;
        let guess = '';
        console.log(`\nGame ${gameNumber} starts!`);

        while (true) {
            guess = prompt('Enter your guess: ');
            if (!isValidGuess(guess)) {
                continue;
            }
            attempts++;
            const { bulls, cows } = getBullsAndCows(secretNumber, guess);
            if (bulls === 4) {
                console.log(`Congratulations, ${playerName}! You guessed the secret number ${secretNumber} in ${attempts} attempt(s).`);
                attemptsHistory.push(attempts);
                break;
            } else if (bulls === 0 && cows === 0) {
                console.log('No bulls, no cows. Keep trying!');
            } else {
                console.log(`${bulls} bull(s) and ${cows} cow(s)`);
            }
        }

        let response = prompt('Do you want to play another round? (yes/no): ').trim().toLowerCase();
        playAgain = response === 'yes' || response === 'y';
    } while (playAgain);

    // Display game statistics
    console.log(`\nThank you for playing, ${playerName}!`);
    console.log(`You played ${gameNumber} game(s).`);
    attemptsHistory.forEach((attempts, index) => {
        console.log(`Game ${index + 1}: ${attempts} attempt(s)`);
    });
}

// Start the game
playGame();

