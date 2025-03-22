// DOM Elements
const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');
const timerEl = document.querySelector('.timer span');
const bestScoreEl = document.querySelector('.best-score span');
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const endScreen = document.getElementById('end-screen');
const restartButton = document.getElementById('restart-button');
const finalScoreEl = document.getElementById('final-score');

// Game Variables
let score = 0;
let timeLeft = 30;
let bestScore = localStorage.getItem('bestScore') || 0;
let gameInterval, timerInterval;

// Audio for Smash
const smashSound = new Audio("assets/smash.mp3"); 

// Update Best Score
bestScoreEl.textContent = bestScore;

// Cursor Movement
window.addEventListener('mousemove', e => {
    cursor.style.top = `${e.pageY}px`;
    cursor.style.left = `${e.pageX}px`;
});
window.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

// Start Game
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreEl.textContent = score;
    timerEl.textContent = timeLeft;
    startScreen.classList.remove('active');
    endScreen.classList.remove('active');
    gameInterval = setInterval(spawnMole, 1500);
    timerInterval = setInterval(updateTimer, 1000);
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    finalScoreEl.textContent = score;
    endScreen.classList.add('active');
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);
        bestScoreEl.textContent = bestScore;
        confetti();
    }
}

function updateTimer() {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft === 0) endGame();
}

function spawnMole() {
    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];
    const mole = document.createElement('img');
    mole.classList.add('mole');
    mole.src = 'assets/mole.png';

    mole.addEventListener('click', () => {
        score += 10;
        scoreEl.textContent = score;
        smashSound.play(); // Play smash sound
        mole.src = 'assets/mole-whacked.png';
        setTimeout(() => mole.remove(), 300);
    });

    hole.appendChild(mole);
    setTimeout(() => mole.remove(), 1500);
}
