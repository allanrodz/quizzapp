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


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
 
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function dingSound(){
    let ding = new Audio ('sounds/ding.mp3');
    ding.play();
}

function wrongSound(){
    let wrong = new Audio ('sounds/wrong-answer.mp3');
    wrong.play();
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        dingSound();
        selectedBtn.classList.add("correct"); 
        score++;
    }else{
        wrongSound();
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}


function showScore(){
    resetState();
    let userScore = `You scored ${score} out of ${questions.length}.`;
    questionElement.innerHTML = userScore;
    questionElement.style.textAlign = "center"; // Align the text at the center
    nextButton.innerHTML = "Play Again?";
    nextButton.style.display = "block";
    
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();
