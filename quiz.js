//VARIABLES
//Establish variables to be called later
var timeEl = document.querySelector(".timerCountDown");
var index = 0;
var secondsLeft = 30;
var timerInterval;

//format new Question("question?", [all answer options includeing correct], "correct answer")
var questions = [
    new Question("What county in Pennsylvania is Dunder Mifflin Scranton branch located?", ["1. Allegheny County", "2. Lackawanna County", "3. Lancaster County", "4. Schuylkill County"], "2. Lackawanna County"),
    new Question("What does Michael burn his foot on?", ["1. A George Foreman Grill", "2. A hot coal walk", "3. Dwight's fire drill", "4. Walking on hot asphalt"], "1. A George Foreman Grill"),
    new Question("What does Michael eat instead of ice cream because they don’t have any?", ["1. Frozen yogurt", "2. Mayo and black olives", "3. Peanut butter with a spoon", "4. An entire family sized pot pie"], "2. Mayo and black olives"),
    new Question("What color is “whore-ish” according to Angela?", ["1. Orange", "2. Gold", "4. Red", "4. Green"], "4. Green"),
    new Question("Which character is named after the actor that plays them?", ["1. Angela Martin", "2. Phyllis Vance", "3. Creed Bratton", "4. Oscar Martinez"], "3. Creed Bratton")
];

function Quiz(questions) {
    this.questions = questions;
    this.questionIndex = 0;
}

var quiz = new Quiz(questions);

//FUNCTIONS

//sets up the question variables into text/choices/answer to be used
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

//function starts the game and verifies game isn't over
function startGame() {

    if (quiz.isEnded()) {
        document.getElementById("timer").setAttribute("class", "hide");
        clearInterval(timerInterval);
        gameOver();
    }
    else {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
    }
};

//gets index from current question set
Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}

//compares the answer to the choices to verify correct or not
Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}


//function applies to current question/answer set and checks if the selection is correct or not and then displays accordingly
Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        var correct = document.createElement("div");
        correct.innerHTML = "Michael would be proud!"
        document.getElementById("result").appendChild(correct);
        setTimeout(function () {
            document.getElementById("result").removeChild(correct);
        }, 1500);


        console.log("Correct!");
    } else {
        var wrong = document.createElement("div");
        wrong.innerHTML = "Dwight says FALSE!"
        document.getElementById("result").appendChild(wrong);
        setTimeout(function () {
            document.getElementById("result").removeChild(wrong);
        }, 1500);


        secondsLeft = secondsLeft - 10;
        console.log("False!");
    }

    this.questionIndex++;
}

//verifies that there are no more questions 
Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        startGame();
    }
};

//checks to make sure score is not a negative number
function scoreCalc() {
    if (secondsLeft < 0) {
        secondsLeft = 0;
        return secondsLeft;
    } else {
        return secondsLeft;
    }
}

//when game is over hides answer buttons and displays game over screen
function gameOver() {
    var gameOver = "<h1>Game Over</h1>";
    gameOver += "<h2 id='score'> Your score: " + scoreCalc() + "</h2>";
    var element = document.getElementById("question");
    element.innerHTML = gameOver;

    document.getElementById("answers").setAttribute("class", "hide");
    document.getElementById("gameOver").removeAttribute("class", "hide");
};

//EVENT HANDLERS

//function that starts the timer when start is clicked and changes the screen from opening to quiz
$("#random-button").on("click", function () {
    event.preventDefault();
    document.getElementById("openScreen").setAttribute("class", "hide");
    document.getElementById("quiz").removeAttribute("class", "hide");

    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.innerHTML = secondsLeft;

        if (secondsLeft <= 0) {
            document.getElementById("timer").setAttribute("class", "hide");
            clearInterval(timerInterval);
            gameOver();
        }

    }, 1000);
})

var savedHighScores  = [];

//action taken when score is being saved. Adds to local storage
$("#submitScore").on("click", function () {
    window.location.href = "highscores.html";
    var playerInitials = document.querySelector("#playerInitials").value  + ": ";
    var playerScore = secondsLeft;
    var newHighScore = playerInitials.concat(playerScore);
    localStorage.setItem("newHighScore", newHighScore);
})



//calls all of this to begin the game


    startGame();


