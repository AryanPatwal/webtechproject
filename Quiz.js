const questions=[
    {
        question: "Look at this series: 12, 11, 13, 12, 14, 13, … What number should come next?",
        answers: [
            {text: "10", correct: false},  
            {text:"16", correct: false},
            {text:"13", correct: false},
            {text:"15",correct: true},
        ]
    },
    {
        question: " Which word is the odd man out?",
        answers: [
            {text: "hate", correct: true},  
            {text:"fondness", correct: false},
            {text:"attachment", correct: false},
            {text:"liking",correct: false},
        ]
    },
    {
        question: "CUP : LIP :: BIRD : ?",
        answers: [
            {text: "Forest", correct: false},  
            {text:"Beak", correct: true},
            {text:"Bush", correct: false},
            {text:"Grass",correct: false},
        ]
    },
    {
        question: "Today it is Thursday.After 132 days,it will be",
        answers: [
            {text: "Monday", correct: false},  
            {text:"Sunday", correct: false},
            {text:"Wednesday", correct: true},
            {text:"Thursday",correct: false},
        ]
    },
    {
        question: "Complete the series 1,6,13,22,33,..",
        answers: [
            {text: "46", correct: true},  
            {text:"48", correct: false},
            {text:"49", correct: false},
            {text:"51",correct: false},
        ]
    },
    {
        question: "Dilip is the brother of Rahul. Sujata is the sister of Atul. Rahul is the son of Sujata. How is Dilip related to Sujata ?",
        answers: [
            {text: "Brother", correct: false},  
            {text:"Son", correct: true},
            {text:"Father", correct: false},
            {text:"Nephew",correct: false},
        ]
    },
    {
        question: "Scribble : Write : : Stammer : ?",
        answers: [
            {text: "Walk", correct: false},  
            {text:"Play", correct: false},
            {text:"Speak", correct: true},
            {text:"Dance",correct: false},
        ]
    },
    {
        question: "Gravity is related to pull in the same way as Magnetism is related to :",
        answers: [
            {text: "Repulsion", correct: false},  
            {text:"Separation", correct: false},
            {text:"Attraction", correct: true},
            {text:"Push",correct: false},
        ]
    },
    {
        question: "A man is 24 years, older than his son. In two years, his age will be twice the age of his son. The present age of his son is ?",
        answers: [
            {text: "14", correct: false},  
            {text:"22", correct: true},
            {text:"20", correct: false},
            {text:"18",correct: false},
        ]
    },
    {
        question: "If you rearrange the letters BARBIT you would have the name of a:",
        answers: [
            {text: "Ocean", correct: false},  
            {text:"Country", correct: false},
            {text:"City", correct: false},
            {text:"Animal",correct: true},
        ]
    }
];

const questionElement=document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton =document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;
const totalTime = 600; // 10 minutes in seconds
let timeLeft = totalTime;
let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
        updateTimer();
    }, 1000);
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function endQuiz() {
    clearInterval(timerInterval);
    // Display the score or any other ending message
    showScore();
}


function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
    startTimer();
}

function showQuestion(){
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo +". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn= e.target;
    const isCorrect= selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled= true;
    });
    nextButton.style.display= "block";
}
function calculateIQScore() {
    let iqScore = Math.round((score / questions.length) * 100);
    return iqScore;
}
function getIQLevel(iqScore) {
    if (iqScore >= 90) {
        return "Superior";
    } else if (iqScore >= 80) {
        return "High";
    } else if (iqScore >= 70) {
        return "Above Average";
    } else if (iqScore >= 60) {
        return "Average";
    } else {
        return "Below Average";
    }
}

function showScore() {
    resetState();
    let iqScore = calculateIQScore();
    let iqLevel = getIQLevel(iqScore);
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}.Your IQ score is ${iqScore}. This is considered ${iqLevel} intelligence.`;
    nextButton.innerHTML = "Play Again?";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
    
});
startQuiz();
