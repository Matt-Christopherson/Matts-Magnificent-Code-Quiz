// An array that holds the five different questions, their answers, and their correct answers.
let questions = [
    {
        question: "Commonly used data types do NOT include: ",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "3. alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed with: ",
        answers: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        correctAnswer: "3. parenthesis"
    },{
        question: "Arrays in JavaScript can be used to store: ",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "4. all of the above"
    },{
        question: "String values must be enclosed within _____ when being assigned to variables. ",
        answers: ["1. quotes", "2. curly brackets", "3. commas", "4. parenthesis"],
        correctAnswer: "1. quotes"
    },{
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "4. console.log"
    },
]

let questionEl = document.getElementById("card-header"); // Declares the card-header div element in the HTML as a variable named questionEl. The reason for naming it questionEl is because for the majority of the user experience, the card header will appear as a question.
let answersEl = document.getElementById("card-body"); // Declares the card-body div element in the HTML as a variable named answersEl. The reason for naming it answersEl is because for the majority of the user experience, the card body will appear as the possible answers to the question.
let footerEl = document.getElementById("card-footer"); // Declares the card-footer div element in the HTML as a variable named footerEl.
let timeEl = document.getElementById("timer"); // Declares the timer h3  element in the HTML as a variable named timeEl.
let leaderboard = []; // Declares the leaderboard variable as an empty array by default.
let timerInterval; // Declares timerInterval as a global variable. It's important that this is global because multiple functions modifiy the timer.
let currentQuestion = 0; // Later in the code, currentQuestion will be used as the variable that refers to the array number called from the questions array. This sets it as 0, making the common data type question the first one shown to the user.
let timeLimit = 60; // This variable is the number that keeps track of how many seconds are left and what the user's score is. It is set at 60 in the beginning to give the user one minute to finish the quiz.

// This function listens for when the Start Quiz button is clicked. When the button is clicked, it starts the timer, shows the first question, console logs "let's begin" (for debugging purposes), and hides the start button from the user.
function letsBegin() {
    startTimer(); // Starts timer
    displayQuestion(); // Shows first question
    console.log("let's begin"); // Console logs "let's begin". Unnecessary for the functioning of the application
    const startButton = document.getElementById("start"); // Links the start button to the javascript so that the next line of code will function
    startButton.style.display = "none"; // Hides start button
}

// This function starts the count down timer. 
function startTimer() {
    timeEl.textContent = "Time remaining: " + timeLimit; // Tells the user how much time they have remaining. This code gets repeated on line 51, but without this line of code there is a one second delay between the start of the quiz and the timer showing up.

    timerInterval = setInterval(function () {
        timeLimit--; // Decreases the time limit by 1.
        timeEl.textContent = "Time remaining: " + timeLimit;
        // This if statement ends the game if the time limit becomes less than or equal to 0.
        if (timeLimit <= 0) {
            endGame();
        }
    }, 1000)// Tells the function how many miliseconds to wait until it runs again.
    console.log("timer set"); // Console logs "timer set". Unnecessary for the functioning of the application, only included for debugging purposes.
}

function displayQuestion() {
    questionEl.textContent = questions[currentQuestion].question;

    answersEl.textContent = "";
    for (let i = 0; i < questions [currentQuestion].answers.length; i++) {
        const answerButton = document.createElement("button");
        answerButton.textContent = questions[currentQuestion].answers[i];
        answerButton.onclick = function () {
            checkAnswer(questions[currentQuestion].answers[i])
        };
        answersEl.appendChild(answerButton);
    };
}

function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestion].correctAnswer;
    if (selectedAnswer === correctAnswer) {
        footerEl.textContent = "Correct!";
    } else {
        timeLimit -= 10;
        footerEl.textContent = "Incorrect! -10 Seconds!"
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion ();
    } else {
        endGame();
    }
    console.log("Current Score: " + timeLimit);
  }

function endGame() {
    clearInterval(timerInterval);
    footerEl.textContent = "";
    questionEl.textContent = "Game Over!";
    answersEl.textContent = "Your final score is: " + timeLimit;

    const scoreboardForm = document.createElement("form");
    scoreboardForm.innerHTML = "<label for='name'>Enter your name to save your score: </label>" + "<input type='text' id='name' name='name'>" + "<input type='submit' value=submit>";
    answersEl.appendChild(scoreboardForm);

    scoreboardForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const playerName = document.getElementById("name").value;
        saveScore (playerName, timeLimit);

    displayLeaderboardButton();
    });
  }

function displayLeaderboardButton() {
    const leaderboardButton = document.createElement("button");
    leaderboardButton.textContent = "View Leaderboard";
    answersEl.appendChild(leaderboardButton);

    leaderboardButton.addEventListener("click", function() {
        displayLeaderboard();
    })
}  

function displayLeaderboard() {
    timeEl.textContent="";
    retrieveLeaderboard();
    let leaderboardHTML = "<h1>Leaderboard</h1>";
    for (let i=0; i < leaderboard.length; i++) {
        const entry = leaderboard[i];
        leaderboardHTML += "<p>" + entry.name + ": " + entry.score + "</p>";
    }
    answersEl.innerHTML = leaderboardHTML;
    questionEl.textContent = "";
    footerEl.textContent = "Refresh the page to try again!"
}

function saveScore(playerName, score) {
    retrieveLeaderboard();
    leaderboard.push({name: playerName, score: score});
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }

function retrieveLeaderboard() {
    leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
}