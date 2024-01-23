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

// This function runs when the user clicks "start quiz" and when they answer a question. When it runs, it shows the next question and set of answers to the user.
function displayQuestion() {
    questionEl.textContent = questions[currentQuestion].question;//Changes the text content of the card header into the next question in the array.
    answersEl.textContent = "";//Clears the text content of the card body.

    //This for loop runs through the answers in the array and creates button elements that can be clicked to run a function that checks to see if the button clicked was the correct answer.
    for (let i = 0; i < questions [currentQuestion].answers.length; i++) { 
        const answerButton = document.createElement("button");
        answerButton.textContent = questions[currentQuestion].answers[i];
        answerButton.onclick = function () {
            checkAnswer(questions[currentQuestion].answers[i])
        };
        answersEl.appendChild(answerButton);
    };
}
//This is the aforementioned function that the for loop on line 66 uses to check if the user's chosen button was correct. 
function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestion].correctAnswer; //Sets the correct answer.
    if (selectedAnswer === correctAnswer) { //If the clicked answer is equal to the correct answer-
        footerEl.textContent = "Correct!"; //-then the footer on the next question will say "correct!". But if not-
    } else {
        timeLimit -= 10; //-then the time limit is reduced by 10 seconds and-
        footerEl.textContent = "Incorrect! -10 Seconds!" //-the footer on the next question will inform the user, "incorrect! -10 seconds!".
    }

    currentQuestion++; //This function also handles increasing the array number to 1, letting the browser know that we are on to the next question.
    if (currentQuestion < questions.length) { //If the current question is less than the length of the questions array-
        displayQuestion ();//-then it will run the displayQuestion function. But if not-
    } else {
        endGame();//it runs the endGame function. Which, true to its name, ends the game. 
    }
    console.log("Current Score: " + timeLimit);//Console logs the current score for debugging purposes.
  }

 //This function ends the game, like I said before. 
function endGame() {
    clearInterval(timerInterval); //Stops the timer.
    footerEl.textContent = ""; //Clears the footer text content.
    questionEl.textContent = "Game Over!"; //Sets the text content in the card header to "Game Over!"
    answersEl.textContent = "Your final score is: " + timeLimit; //Sets the text content in the card body to a message telling the user their final score.

    //These next three lines create a form for the user to enter their name.
    const scoreboardForm = document.createElement("form"); //Creates an HTML form element and assigns it to a variable called scoreboardForm.
    scoreboardForm.innerHTML = "<label for='name'>Enter your name to save your score: </label>" + "<input type='text' id='name' name='name'>" + "<input type='submit' value=submit>"; //Edits the form element's HTML to add a label, an input id, and a submit button.
    answersEl.appendChild(scoreboardForm); //Adds the form to the bottom of the card body.

    scoreboardForm.addEventListener("submit", function(event) { //Waits for the user to click the submit button on their form.
        event.preventDefault(); //Prevents the page from refreshing.
        const playerName = document.getElementById("name").value; //Creates a variable called playerName equal to the name entered in the form.
        saveScore (playerName, timeLimit); //Changes the parameters for the saveScore function, which will be found and explained on line 142.

    displayLeaderboardButton();//Runs the displayLeaderBoard function when the form's submit button is clicked.
    });
  }

// This function displays the leaderboard.
function displayLeaderboardButton() {
    const leaderboardButton = document.createElement("button"); //Creates an HTML button element and assigns it to a variable called leaderboardButton.
    leaderboardButton.textContent = "View Leaderboard";//Changes the text content of the button so it reads, "View Leaderboard".
    answersEl.appendChild(leaderboardButton);//Adds the button to the bototm of the card body.
    //Waits for the user to click the leaderboard button and then runs the displayLeaderboard function.
    leaderboardButton.addEventListener("click", function() {
        displayLeaderboard();
    })
}  

// Shows the user the leaderboard of scores from previous users using the same local data.
function displayLeaderboard() {
    timeEl.textContent=""; //Hides the timer.
    retrieveLeaderboard(); //runs the retrieveLeaderboard function so it can parse the local data.
    let leaderboardHTML = "<h1>Leaderboard</h1>";
    //Goes through each leaderboard entry saved in the leaderboard array and makes it into a list.
    for (let i=0; i < leaderboard.length; i++) {
        const entry = leaderboard[i];
        leaderboardHTML += "<p>" + entry.name + ": " + entry.score + "</p>";
    }
    answersEl.innerHTML = leaderboardHTML; //Changes the card body to the list of leaderboard entries.
    questionEl.textContent = ""; //Clears the card header.
    footerEl.textContent = "Refresh the page to try again!" //Lets the user know how they can retry the quiz.
}

//Uses the parameters set by the function on line 106 to save the score and name entry given by the user to the local data.
function saveScore(playerName, score) {
    retrieveLeaderboard();
    leaderboard.push({name: playerName, score: score});
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard)); //Stringifies the item sent to the local storage.
  }

//Retrieves the data saved in the local data, parses it, and turns it into an array. 
function retrieveLeaderboard() {
    leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
}