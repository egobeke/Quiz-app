// DOM ELEMENTS
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const backButton = document.getElementById("back-button");
const progressElement = document.getElementById("progress");
const scoreElement = document.getElementById("score");
const resultContainer = document.getElementById("result-container");
const totalQuestionsElement = document.getElementById("total-questions");

const questions = [
    {
        question:"What does SQL stands for?",
        answers:["Simple Question Language",
                 "Systematic Query Language",
                 "Standard Question Language",
                 "Structured Query Language"],
        correct: 3         
    },
    {
        question:"What does CSS stand for?",
        answers:["Cascading Style Sheets",
                 "Colorful Style Sheets",
                 "Computer Style Sheets",
                 "Cascading Simple Sheets"],
        correct: 0         
    },
    {
        question:"Which of the following is a correct way to declare a variable in Javascript?",
        answers:["Var x = 10;",
                 "Variable x = 10;",
                 "Int x = 10:",
                 "Let 10 = x;"],
        correct: 0         
    },
    {
        question:"What language is used for Andriod development?",
        answers:["Python",
                 "Java",
                 "Javascript",
                 "Ruby"],
        correct: 1         
    },
    {
        question:"Which data structure is best for searching element quickly?",
        answers:["Queue",
                 "Array",
                 "Binary Search Tree",
                 "Linked List"],
        correct: 2         
    }
];

totalQuestionsElement.textContent = `Total Questions: ${questions.length}`;

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = {};

startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    quizContainer.style.display = "block";
    startQuiz();
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = {};
    nextButton.style.display = "none";
    restartButton.style.display = "none";
    backButton.style.display = "none";
    resultContainer.style.display = "none";
    scoreElement.textContent = `Score: ${score}`;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("btn");
        if (selectedAnswers[currentQuestionIndex] === index) {
            button.innerHTML += selectedAnswers[currentQuestionIndex] === questions[currentQuestionIndex].correct ? " ✅" : " ❌";
            button.disabled = true;
        }

        button.addEventListener("click", () => selectAnswer(button, index));
        answerButtons.appendChild(button);
    });

    nextButton.style.display = "block";
    backButton.style.display = currentQuestionIndex > 0 ? "block" : "none";
}

function selectAnswer(button, index) {
    let correctAnswerIndex = questions[currentQuestionIndex].correct;

    selectedAnswers[currentQuestionIndex] = index;

    if (selectedAnswers[currentQuestionIndex] === correctAnswerIndex) {
        score++;
    } else if (selectedAnswers[currentQuestionIndex] !== correctAnswerIndex && score > 0) {
        score--;
    }

    button.innerHTML += index === correctAnswerIndex ? " ✅" : " ❌";
    
    scoreElement.textContent = `Score: ${score}`;

    // disable all buttons after selection
    // Array.from(answerButtons.children).forEach(btn => btn.disabled = true);
    nextButton.style.display = "block";

}

function resetState() {
    answerButtons.innerHTML = "";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

backButton.id = "back-button";
backButton.textContent = "Back";
backButton.style.display = "none";
quizContainer.appendChild(backButton);


backButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
});


function showResults() {
    resultContainer.style.display = "block";
    let message = "";
    if (score === questions.length) {
        message = "Excellent! You got all the answers right! 🥳";
    } else if (score > questions.length / 4) {
        message = "Great job!. 👍";
    } else {
        message = "Keep practicing! You'll get them right next time. 🙁";
    }

    resultContainer.innerHTML = `<p>${message}</p><p>Your final score: ${score} out of ${questions.length}</p>`;
   
    progressElement.textContent = "";
    nextButton.style.display = "none";
    restartButton.style.display = "block";
    backButton.style.display = "none"; 
}

restartButton.addEventListener("click", startQuiz);

