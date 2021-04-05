var countDownTimer = 75;
var quizGroupEl = document.querySelector("#quiz-group");
var quizQuestionsEl = document.querySelector("#quiz-questions");
var quizAnswersEl = document.querySelector("#quiz-answers");
var instructionsEl = document.querySelector("#instructions");
var highScores = [];

// check element selection
console.log(quizQuestionsEl);
console.log(quizAnswersEl);

// array containing the quiz questions and answers
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

// testing code ----------------------------------
var startButtonEl = document.querySelector("#start-quiz");


// for (var n = 0; n < codingQuiz[0].choices.length; n++) {
//     var answersEl = document.createElement("li","button");
//     answersEl.textContent = codingQuiz[0].choices[n];
//     answersEl.className = "btn";
//     quizAnswersEl.appendChild(answersEl);
// }


// starts the quiz by clearing the screen first
// var startQuiz = function() {
//     // remove p and start quiz button
//     instructionsEl.remove();
//     startButtonEl.remove();
    
//     // load questions and answers
//     loadQuiz();
// }
//----------------------------------------


// when start button is clicked, clear page and load quiz
startButtonEl.addEventListener("click", function()
    {
        // remove instructions and start-quiz button
        instructionsEl.remove();
        startButtonEl.remove();
    
        // load questions and answers
        loadQuiz();
    }
);

// question number tracker
var numQ = 0;

// loads questions and answers from the codeQuiz array
var loadQuiz = function() {
    // load questions and answers
    if (numQ < codingQuiz.length) {
        // replace heading with questions
        quizQuestionsEl.textContent = codingQuiz[numQ].question;

        // create new list element of choices
        for (var i = 0; i < codingQuiz[numQ].choices.length; i++) {
            var answersEl = document.createElement("li");
            answersEl.textContent = codingQuiz[numQ].choices[i];
            answersEl.className = "btn";
            answersEl.setAttribute("answer-id", i);
            quizAnswersEl.appendChild(answersEl);
        }

        // wait for user to choose answer
        console.log("waiting for answer");
        quizAnswersEl.addEventListener("click", answerCheck);
        
    } else {
        // show results
    }
}

var answerCheck = function (event) {
    // find chosen answer based on event.targets answer-id attribute
    var answerSelected = event.target.getAttribute("answerId");
    console.log(answerSelected);
    
    // correct if 
    if (codingQuiz[numQ].answers[answerSelected] === true) {
       //add bottom border to quiz group div and add div to display correct
        var checkAnswerEl = document.createElement("div");
        checkAnswerEl.textContent = "Correct!";
        checkAnswerEl.className= "results";
        quizGroupEl.appendChild(checkAnswerEl);
        numQ++;
        // load next question
        loadQuiz();
    } else {
        var checkAnswerEl = document.createElement("div");
        checkAnswerEl.textContent = "Wrong!";
        checkAnswerEl.className = "results";
        quizGroupEl.appendChild(checkAnswerEl);
        numQ++;
        // penalize score/time by 10s
        countDownTimer = countDownTimer - 10;
        // load next question
        loadQuiz();
    }
}


// startButtonEl.addEventListener("click", startQuiz());
// **debug ** doesn't wait for click, automatically starts quiz


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