var countDownTimer = 75;
var quizGroupEl = document.querySelector("#quiz-group");
var quizQuestionsEl = document.querySelector("#quiz-questions");
var quizAnswersEl = document.querySelector("#quiz-answers");
var highScores = [];

// question and answer arrays to hold coding quiz questions and answers
// var questions = new Array();
// var answers = new Array();

// // define question 1
// questions[0] = new Array();
// questions[0][0] = "Commonly used data types DO NOT include:";
// // choices
// questions[0][1] = "strings";
// questions[0][2] = "booleans";
// questions[0][3] = "alerts";
// questions[0][4] = "numbers";

// // assign answer for question 1
// answers[0] = "3";

// create array of questions and answers
var codingQuiz = [
    {
        question: "Commonly used data types DO Not include:" ,
        choices: ["strings", "booleans", "alerts", "numbers"],
        answers: [false, false, true, false]
    },
    {
        question: "The condition in an if/else statement is enclosed with ________.",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answers: [false, false, true, false]
    },
    {
        question: "Arrays in JavaScript can be used to store ________.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answers: [false, false, false, true]
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answers: [false, false, true, false]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answers: [false, false, false, true]
    }
];

var startButtonEl = document.querySelector("#start-quiz");
console.log(startButtonEl);


startButtonEl.addEventListener("click", function()
{
    console.log("start quiz");
});

// when start quiz button is clicked, load quiz
//quizGroupEl.addEventListener("submit", startQuiz);

// // update the countdown every second
// var timer = setInterval(function() {

//     if (countDownTimer >= 0) {
//         countDownTimer--;
//         // display the result in the element with id timer
//         document.getElementById("timer").innerHTML = countDownTimer;
//     }

//     // if the countdown is finished, let user know
//     if (countDownTimer < 0) {
//         alert("Time's Up!");
//         clearInterval(timer);
//     }
// }, 1000);