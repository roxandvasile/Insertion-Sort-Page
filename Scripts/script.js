"use strict"

function result() {
    var score = 0;
    var correctAnswers = document.getElementsByClassName('correct-answer');

    for (let index = 0; index < correctAnswers.length; index++) {
        const element = correctAnswers[index];
        if (element.checked) {
            score++;
        }
    }

    alert("Your score is:" + score);
    // to print on browser
    //document.write("Your score is:" + score);

}