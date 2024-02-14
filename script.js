const questions = [
    {
        question: "How many All-Ireland Senior Hurling Titles did Kilkenny win between 1960 and 2019?",
        answers: [
        {text: "22", correct: true},
        {text: "11", correct: false},
        {text: "16", correct: false},
        {text: "30", correct: false},
        ]
        },
        {
        question: "Which player won the Hurler of the Year Award three times?",
        answers: [
        {text: "D.J. Carey", correct: false},
        {text: "Henry Shefflin", correct: true},
        {text: "Eoin Larkin", correct: false},
        {text: "J.J. Delaney", correct: false},
        ]
        },
        {
        question: "How many All-Star Awards were shared among Kilkenny players since 1971?",
        answers: [
        {text: "95", correct: false},
        {text: "73", correct: false},
        {text: "195", correct: true},
        {text: "150", correct: false},
        ]
        },
        {
        question: "Who was selected as the goalkeeper in the Kilkenny team of the past sixty years?",
        answers: [
        {text: "Noel Skehan", correct: false},
        {text: "James McGarry", correct: false},
        {text: "Eoin Murphy", correct: true},
        {text: "P.J. Ryan", correct: false},
        ]
        },
        {
        question: "Which player scored 1-3 in the 2006 All-Ireland final against Cork?",
        answers: [
        {text: "Aidan Fogarty", correct: false},
        {text: "Eoin Larkin", correct: true},
        {text: "Henry Shefflin", correct: false},
        {text: "D.J. Carey", correct: false},
        ]
        },
        {
        question: "Who was chosen as the best Kilkenny player in the left half forward position over the past 60 years?",
        answers: [
        {text: "Eddie Keher", correct: true},
        {text: "T.J. Reid", correct: false},
        {text: "Eoin Larkin", correct: false},
        {text: "D.J. Carey", correct: false},
        ]
        },
        {
        question: "Which player has the record of playing in 12 All-Ireland finals in 11 years?",
        answers: [
        {text: "Henry Shefflin", correct: false},
        {text: "J.J. Delaney", correct: false},
        {text: "Eoin Larkin", correct: true},
        {text: "Tommy Walsh", correct: false},
        ]
        },
        {
        question: "How many positions did T.J. Reid line out in during All-Ireland finals?",
        answers: [
        {text: "Four", correct: false},
        {text: "Six", correct: true},
        {text: "Two", correct: false},
        {text: "Three", correct: false},
        ]
        },
        {
        question: "Who was unlucky to lose out to Eoin Larkin for a position in the final team selection?",
        answers: [
        {text: "Aidan Fogarty", correct: true},
        {text: "Richie Hogan", correct: false},
        {text: "Eddie Brennan", correct: false},
        {text: "Michael Fennelly", correct: false},
        ]
        },
        {
        question: "Who was selected for the midfield position in the Kilkenny team of the past sixty years?",
        answers: [
        {text: "Derek Lyng", correct: false},
        {text: "Michael Fennelly", correct: true},
        {text: "Liam 'Chunky' O'Brien", correct: false},
        {text: "Richie Hogan", correct: false},
        ]
        },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30; // 30 seconds for the countdown


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-btn').addEventListener('click', startQuiz);
    document.getElementById('leaderboard-overlay').addEventListener('click', hideLeaderboard);
    // Prevent the overlay from closing when clicking inside the leaderboard
    document.querySelector('.leaderboard').addEventListener('click', (e) => e.stopPropagation());
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('start-btn').style.display = 'none';
    document.querySelector('.quiz').style.display = 'block';
    showQuestion();
    timeLeft = 30; // Reset the timer each time the quiz starts
    timer = setInterval(updateTimer, 1000); // Start the timer, calling updateTimer every second
}

function updateTimer() {
    timeLeft--;
    const timerElement = document.getElementById('timer');
    timerElement.innerText = `Time Left: ${timeLeft}s`;

    // Clear previous classes
    timerElement.classList.remove('timer-green', 'timer-yellow', 'timer-red', 'timer-blink');

    // Apply new class based on the time left
    if (timeLeft > 20) {
        timerElement.classList.add('timer-green');
    } else if (timeLeft > 10 && timeLeft <= 20) {
        timerElement.classList.add('timer-yellow');
    } else if (timeLeft > 5 && timeLeft <= 10) {
        timerElement.classList.add('timer-red');
    } else if (timeLeft <= 5) {
        timerElement.classList.add('timer-red', 'timer-blink');
    }

    if (timeLeft <= 0) {
        clearInterval(timer); // Stop the timer
        endGame(); // End the game when time runs out
    }
}




function showQuestion() {
    const question = questions[currentQuestionIndex];
    const questionElement = document.getElementById("question");
    questionElement.innerHTML = `Question ${currentQuestionIndex + 1}: ${question.question}`;
    const answerButtonsElement = document.getElementById("answer-buttons");
    answerButtonsElement.innerHTML = '';

    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn", "btn-secondary", "mb-2");
        // Set data-correct attribute based on the answer's correctness
        button.dataset.correct = answer.correct;
        button.addEventListener('click', () => selectAnswer(answer.correct, button));
        answerButtonsElement.appendChild(button);
    });
    
}

function selectAnswer(correct, button) {
    // Play sound based on the correctness of the selected answer
    if (correct) {
        score++;
        dingSound();
        button.classList.add('correct');
    } else {
        wrongSound();
        button.classList.add('incorrect');
    }

    // Iterate over all answer buttons to reveal correct and incorrect answers
    const answerButtonsElement = document.getElementById("answer-buttons");
    Array.from(answerButtonsElement.children).forEach(btn => {
        // Disable the button
        btn.disabled = true;

        // Reveal which buttons are correct or incorrect
        if (btn.dataset.correct === "true") {
            btn.classList.add("correct");
        } else {
            btn.classList.add("incorrect");
        }
    });

    // Show the next button
    document.getElementById('next-btn').style.display = 'block';
}



document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

function endGame() {
    clearInterval(timer); // Stop the timer
    // Hide the quiz container
    document.querySelector('.quiz').style.display = 'none';

    // Prompt for username and save score
    const username = prompt("Enter your username to save your score:");
    if (username) saveScore(username, score);

    // Prepare the Game Over section
    const gameOverSection = document.getElementById('game-over');
    gameOverSection.innerHTML = `
        <div style="text-align: center;">
            <h2>Your score: ${score} out of ${questions.length}</h2>
            <button class="btn btn-info" onclick="restartQuiz()">Play Again</button>
            <button class="btn btn-secondary" onclick="showLeaderboardOverlay()">Leaderboard</button>
        </div>
    `;

    // Show the Game Over section
    gameOverSection.style.display = 'block';
}

function restartQuiz() {
    document.getElementById('game-over').style.display = 'none'; // Hide game over section
    startQuiz(); // Restart the quiz
}



function displayEndGameOptions() {
    // Optionally prompt for username and save score here if needed
    document.getElementById('game-over').style.display = 'block';
}

function saveScore(username, score) {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ username, score });
    // Sort the leaderboard by score in descending order
    leaderboard.sort((a, b) => b.score - a.score);
    // Optional: Keep only the top 5 scores, or adjust the number as needed
    const updatedLeaderboard = leaderboard.slice(0, 5);
    localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
    displayLeaderboard(); // Refresh the leaderboard display
}


function showLeaderboardOverlay() {
    const overlay = document.getElementById('leaderboard-overlay');
    overlay.style.display = 'flex';
    displayLeaderboard(); // Make sure this function populates the leaderboard
}


function hideLeaderboard() {
    document.getElementById('leaderboard-overlay').style.display = 'none';
}


function displayLeaderboard() {
    const leaderboardDiv = document.querySelector('#leaderboard-overlay .leaderboard');
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    let leaderboardHTML = '<h2>Leaderboard</h2><table class="table"><thead><tr><th>Rank</th><th>Username</th><th>Score</th></tr></thead><tbody>';
    
    leaderboard.forEach((entry, index) => {
        leaderboardHTML += `<tr><td>${index + 1}</td><td>${entry.username}</td><td>${entry.score}</td></tr>`;
    });
    
    leaderboardHTML += '</tbody></table>';
    leaderboardDiv.innerHTML = leaderboardHTML;
}


// Sounds
function dingSound() {
    const sound = new Audio('sounds/ding.mp3');
    sound.play();
}

function wrongSound() {
    const sound = new Audio('sounds/wrong-answer.mp3');
    sound.play();
}
