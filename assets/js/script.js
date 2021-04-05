var countDownTimer = 75;
var quizGroupEl = document.querySelector("#quiz-group");
var quizQuestionsEl = document.querySelector("#quiz-questions");
var quizAnswersEl = document.querySelector("#quiz-answers");
var instructionsEl = document.querySelector("#instructions");
var highScores = [];

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

//----------------------------------------


// starts the quiz by clearing the screen first
var startQuiz = function(event) {
    // remove p and start quiz button
    instructionsEl.remove();
    startButtonEl.remove();
    
    // load questions and answers
    loadQuiz();
}

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
        console.log("waiting for answer to question " + numQ);
        quizAnswersEl.addEventListener("click", answerCheck);
        
    } else if (numQ === codingQuiz.length) {
        // stop time and show results
        var score = countDownTimer;
        console.log("show results");
        submitScore();
    }
}

// checks if selected answer is correct
var answerCheck = function(event) {
    // find chosen answer based on event.targets answer-id attribute
    var answerSelected = event.target.getAttribute("answer-id");
    console.log(answerSelected);

    if (numQ > 0) {
        clearCheck();
    }
    
    // correct if 
    if (codingQuiz[numQ].answers[answerSelected] === true) {
       //add bottom border to quiz group div and add div to display correct
        var checkAnswerEl = document.createElement("p");
        checkAnswerEl.textContent = "Correct!";
        checkAnswerEl.className= "results";
        checkAnswerEl.setAttribute("result-id", numQ);
        quizGroupEl.appendChild(checkAnswerEl);
        numQ++;
        // load next question
        clearAnswers();
        loadQuiz();
    } else {
        var checkAnswerEl = document.createElement("p");
        checkAnswerEl.textContent = "Wrong!";
        checkAnswerEl.className = "results";
        checkAnswerEl.setAttribute("result-id", numQ);
        quizGroupEl.appendChild(checkAnswerEl);
        numQ++;
        // penalize score/time by 10s
        countDownTimer = countDownTimer - 10;
        // load next question
        clearAnswers();
        loadQuiz();
    }
}

// clear answer space for next round of answers
var clearAnswers = function() {
    // find task list element with answer-id value and remove it
    if (numQ !== codingQuiz.length) {
        for (var i = 0; i < codingQuiz[numQ].answers.length; i++) {
            var answersList = document.querySelector(".btn[answer-id='" + i + "']");
            answersList.remove();
            }
    }
}

// clear answer check for next check
var clearCheck = function() {
    // clear previous answerCheck
    var clearCheck = document.querySelector(".results");
    clearCheck.remove();
}

var submitScore = function() {
    quizQuestionsEl.textContent = "All Done!";
    document.querySelector(".answer-list").remove();

    // create container to hold elements
    var resultDisplayEl = document.createElement("form");
    resultDisplayEl.className = "result-form";

    // create input to gather quiz taker's initials
    resultDisplayEl.innerHTML = "<p id='result-display'>Your final score is " + countDownTimer + ". <br /><label for='name'>Enter Initials: </label><input type='text' name='name' id='name'class='name-input'/>";
    quizQuestionsEl.appendChild(resultDisplayEl);

    // create submit button
    var submitScoreEl = document.createElement("button");
    submitScoreEl.textContent = "Submit";
    submitScoreEl.className = "btn-score";
    document.querySelector("#result-display").appendChild(submitScoreEl);

    // when hoover, results p disappear
    // after submit, show high scores
    // quizQuestionEl.textContent = "High Scores"
    // form/list 1. initials - score
    // go back button, clear high scores button
}


// when start button is clicked, clear page and load quiz
startButtonEl.addEventListener("click", startQuiz);


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