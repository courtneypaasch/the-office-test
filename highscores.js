var displayInitials = " ";

//links back to start of game from highscore page
$("scoresBack").on("click", function () {
    window.location.href = "index.html";
    console.log("Its working!")
})

//clears all saved scores
$("#scoresClear").on("click", function() {
    localStorage.setItem("newHighScore", "");
    document.getElementById("scores").removeChild(displayInitials);

})



function addScores() {

    var newHighScore = localStorage.getItem("newHighScore");
    console.log(newHighScore);

    displayInitials = document.createElement("div");
    displayInitials.innerHTML = newHighScore;
    document.getElementById("scores").appendChild(displayInitials);
}


addScores();