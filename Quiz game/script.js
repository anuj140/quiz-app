// script.js

const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correct: "Paris"
    },
    {
        question: "Which language is used for web development?",
        options: ["Python", "Java", "C++", "JavaScript"],
        correct: "JavaScript"
    },
    // Add more questions as needed
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('quiz-options');
const nextButton = document.getElementById('next-button');
const timerElement = document.getElementById('time');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    document.getElementById('quiz-container').classList.remove('hidden');
    resultContainer.classList.add('hidden');
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const currentData = quizData[currentQuestion];
    questionElement.textContent = currentData.question;
    optionsContainer.innerHTML = '';
    currentData.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('quiz-option');
        button.textContent = option;
        button.onclick = () => selectOption(button, option);
        optionsContainer.appendChild(button);
    });
    nextButton.disabled = true;
}

function selectOption(button, option) {
    const correctOption = quizData[currentQuestion].correct;
    if (option === correctOption) {
        button.style.backgroundColor = '#4CAF50';
        score++;
    } else {
        button.style.backgroundColor = '#F44336';
    }
    Array.from(optionsContainer.children).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctOption) {
            btn.style.backgroundColor = '#4CAF50';
        }
    });
    nextButton.disabled = false;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            showResults();
        }
    }, 1000);
}

nextButton.onclick = () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        clearInterval(timer);
        showResults();
    }
};

function showResults() {
    document.getElementById('quiz-container').classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreElement.textContent = `You scored ${score} out of ${quizData.length}`;
}

restartButton.onclick = startQuiz;

startQuiz();
