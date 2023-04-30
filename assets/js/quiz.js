var startQuiz = document.getElementById("startQuiz")
var saveScore = document.getElementById("saveScore")
var viewScores = document.getElementById("viewScores")
var playAgain = document.getElementById("playAgain")

var welcome = document.getElementById("welcome")
var quiz = document.getElementById("quiz")
var result = document.getElementById("result")

var options = document.getElementById("options")
var message = document.getElementById("message")

var timer = document.getElementById("timer")

var summary = document.getElementById("summary")

var secondsLeft = 0;
var score = 0;
var currentQuestion = 0;
var countdownTimer;

function stopGame() {
    
     clearInterval(countdownTimer);                          // Stop timer

    timer.textContent = "";                                 // Clear timer on screen

    quiz.style.display = 'none';                            // Hide quiz
    result.style.display = 'flex';                          // Show results

    summary.textContent = "Your Score is: " + score;        // Display score
}

function onSaveScore(e) {
    var initials = document.getElementById("initials").value;

    if (initials !== "") {                                  // Do we have valid initials?
        localStorage.setItem(initials, score);              // Save initials to local storage

        document.getElementById("initials").value = "";
    }
}

function onViewScores(e) {
    window.location.href = 'scores.html';                   // Divert browser to scores screen
}

function onSelectAnswer(e) {
    var correctAns = questions[currentQuestion].answer;     // Get correct answer from questions object
    var userAns = e.target.textContent;                     // Get user answer from element target

    console.log("User " + userAns);
    console.log("correct " + correctAns);
    if (correctAns === userAns) {                           // Compare
        score++;                                            // Correct increment score

        displayMessage('Correct');                          // Display correct dialog

    } else {
        score--;                                            // Incorrect decrement score

        displayMessage('Wrong!');                           // Display incorrect dialog
    }
    console.log("score " + score);
    setTimeout(function() {
        displayQuestion();                                  // Call displayQuestion for next question
    }, 1000)                                                // Pause for a second to display right or wrong
                                         
}

function displayMessage(msg) {
    message.textContent = msg;                              // Display message

    setTimeout(function () {
        message.textContent = " ";                          // Clear message 
    }, 1000)                                                // After 1 second
}

function displayQuestion() {
    currentQuestion++;                                      // Increment to next question

    if (currentQuestion >= questions.length) {              // Are we out of questions - have we reached the end of the object
        stopGame();                                         // Call stopGame function
        return;
    }

    var question = questions[currentQuestion];              // Put new question in question variable
    document.getElementById("question").textContent = question.title;   // Put title from question obj in question div of webpage

    options.innerHTML = "";                                 // Clear options div

    for (var i=0; i < question.choices.length; i++) {       // Loop until end of question choices
        var option = document.createElement("div");         // Insert div into option var
        option.textContent = question.choices[i];           // Insert question correlating to iteration number
        option.onclick = onSelectAnswer;                    // On option click, call onSelectAnswer function
        option.classList.add("option");                     // Add option class to css classlist for option element

        options.appendChild(option);                        // Append option div to options element 
    }
}

function onStartGame () {
    secondsLeft = 80;                                       // Set timer 80 seconds
    currentQuestion = 0;                                    // Reset to first question
    score = 0;                                              // Reset score

    countdownTimer = setInterval(function () {              // Start timer
        if (secondsLeft > 0) {                              // If timer not run out
            timer.textContent = `Time left: ${secondsLeft} seconds`;                // Update time left on screen
        } else {
            stopGame();                                     // Call stopGame to end game
        }
        secondsLeft--;                                      // Decrement seconds by 1
    }, 1000);                                               // Run every second

    welcome.style.display = 'none';                         // Hide welcome screen
    result.style.display = 'none';                          // Hide result screen
    quiz.style.display = 'flex';                            // Show quiz using flex

    displayQuestion();                                      // Call displayQuestion to start quiz
}

startQuiz.addEventListener("click", onStartGame);           // Event listener
saveScore.addEventListener("click", onSaveScore);
viewScores.addEventListener("click", onViewScores);
playAgain.addEventListener("click", onStartGame);

