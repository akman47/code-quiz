var countDownTimer = 75;
var timerInterval;
var startButtonEl = document.querySelector("#start-quiz");
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

// starts the quiz by clearing the screen first
var startQuiz = function(event) {
    // remove p and start quiz button
    instructionsEl.remove();
    startButtonEl.remove();
    
    // load questions and answers
    loadQuiz();
    timer();
}

// question number tracker
var numQ = 0;

// loads questions and answers from the codeQuiz array
var loadQuiz = function() {
    // load questions and answers
    if (numQ < codingQuiz.length) {
        // replace heading with questions
        quizQuestionsEl.textContent = "";
        var questionsEl = document.createElement("h2");
            questionsEl.textContent = codingQuiz[numQ].question;
            questionsEl.className = "questions";
            quizQuestionsEl.appendChild(questionsEl);


        //quizQuestionsEl.setAttribute("style", "text-align: left");

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

        if (score < 0) {
            score = 0;
        }

        clearInterval(timeInterval);
        console.log("show results");
        submitScore(score);
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

var submitScore = function(score) {
    quizQuestionsEl.textContent = "All Done!";
    quizQuestionsEl.setAttribute("style", "text-align: center");
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
    submitScoreEl.type = "button";
    document.querySelector("#result-display").appendChild(submitScoreEl);

    submitScoreEl.addEventListener("click", function(event){
        event.preventDefault();
        var userNameInput = document.querySelector("input[name='name']").value;
        if (userNameInput === null || userNameInput === "") {
            alert("Enter your initials to save your score!");
        } else {
        highScoresChart(userNameInput, score);
        }
    });
}

// save score to local storage
var saveScores = function() {
    localStorage.setItem('scoreChart', JSON.stringify(highScores));
}

// gets scores from local storage
var loadScores = function() {
    var savedScores = localStorage.getItem("scoreChart");

    // checks if score is null and if so, sets score back to empty array
    if (!savedScores) {
        return false;
    }

    // change score data from string format into array of objects
    savedScores = JSON.parse(savedScores);
    highScores = savedScores;
}

var highScoresChart = function (name, score) {
    loadScores();
    console.log("high", highScores);

    scoreObj = {name: name,
                playerScore: score
            };

    var updatedScoreChart = [];

    // position in updatedScoreChart array
    var n = 0;

   if (highScores.length === 0 || highScores.length === null) {
        highScores[0] = scoreObj;
        console.log("highScores", highScores);
        saveScores();
        displayHighScore();
    } else {
        // update new Score Array
    
        // if score is highest
         if (score > highScores[0].playerScore) {
            // place score at top of chart
            updatedScoreChart[0] = scoreObj;

            // fill in chart with remaining scores
            for (i=0; i < highScores.length; i++) {
                updatedScoreChart.push(highScores[i]);
                console.log("updated", updatedScoreChart);
            }
            // if score is lowest
         } else if (score < highScores[highScores.length-1].playerScore) {
            // fill in chart with previous high scores
            for (i=0; i < highScores.length; i++) {
                updatedScoreChart.push(highScores[i]);
                console.log("updated", updatedScoreChart);
            }
            // add current score to bottom of chart
            updatedScoreChart[highScores.length] = scoreObj;
            console.log("updated", updatedScoreChart);
       
            // if score is in the middle
         } else {
             // load higher scores first
                while (score < highScores[n].playerScore) {
                    updatedScoreChart.push(highScores[n]);
                    n++;
                    console.log("updated", updatedScoreChart);
                }
                // add score
                updatedScoreChart[n] = scoreObj;
                console.log("updated", updatedScoreChart);

                // load remaining high scores
                for (i = n; i < highScores.length; i++) {
                    updatedScoreChart.push(highScores[i]);
                    console.log("updated", updatedScoreChart);
                }
            }

        highScores = updatedScoreChart;
        saveScores();
     displayHighScore();
    }
}

var displayHighScore = function() {
    quizQuestionsEl.textContent = "";
    clearCheck();

    var viewHighScore = document.createElement("div");
    viewHighScore.setAttribute("id", "#viewHighScore");
    quizQuestionsEl.appendChild(viewHighScore);

    var titleHighScore = document.createElement("h1");
    titleHighScore.textContent = "High Scores";
    titleHighScore.setAttribute("style", "text-align: center");
    titleHighScore.setAttribute("style", "font-size: 30px");
    viewHighScore.appendChild(titleHighScore);

    var chartEl = document.createElement("ol");
    chartEl.className = "score-list-order";
    viewHighScore.appendChild(chartEl);

    for ( i = 0; i < highScores.length; i++){
        var scoreChartEl = document.createElement("li");
        scoreChartEl.textContent = highScores[i].name + " --- " + highScores[i].playerScore;
        scoreChartEl.className = "score-list";
        chartEl.appendChild(scoreChartEl);
    }

    // create container to hold buttons
    var buttonContainerEl = document.createElement("div");
    buttonContainerEl.className = "btn-container";
    viewHighScore.appendChild(buttonContainerEl);

    // create go back button
    var goBackButtonEl = document.createElement("button");
    goBackButtonEl.textContent = "Go back";
    goBackButtonEl.className = "btn-list";
    buttonContainerEl.appendChild(goBackButtonEl);

    // create clear button
    var clearButtonEl = document.createElement("button");
    clearButtonEl.textContent = "Clear high scores";
    clearButtonEl.className = "btn-list";
    buttonContainerEl.appendChild(clearButtonEl);

    // if go back button is clicked, return to start
    goBackButtonEl.addEventListener("click", function(){
        window.history.go();
    });

    // if clear button is clicked, clear highScores array
    clearButtonEl.addEventListener("click", function (){
        highScores = [];
        localStorage.removeItem("scoreChart");
        chartEl.remove();
    })
}

// when start button is clicked, clear page and load quiz
startButtonEl.addEventListener("click", startQuiz);
startButtonEl.addEventListener("click", timer);

var timer = function() {
    timeInterval = setInterval(function() {
        if (countDownTimer > 0) {
            countDownTimer--;
            // display the result in the element with id timer
            document.getElementById("timer").innerHTML= "Time " + countDownTimer;
        }
        // if the countdown is finished, let user know
        else if (countDownTimer < 0 && numQ < codingQuiz.length) {
            alert("Time's Up!");
            var score = 0;
            clearInterval(timeInterval);
        }
        else if (numQ === codingQuiz.length-1) {
        clearInterval(timeInterval);
        }
    }, 1000);
}