$(document).ready(function () {
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var currentSet = 0;
    var totQuestions = 7;
    var count = false
    var time;
    var intervalId;
    var questions = [{
        "question": "Who was the last Jazz player to win an MVP?",
        "option1": "Darrel Griffith",
        "option2": "Adrian Dantley",
        "option3": "Karl Malone",
        "option4": "Pete Maravich",
        "answer": "Karl Malone",
        "right": "Correct! Karl Malone won TWO MVP's in his career. Once in 1997, and the other in 1999"
    }, {
        "question": "Who has the most three-pointers made in a season, in franchise history?",
        "option1": "Gordon Hayward",
        "option2": "Mehmet Okur",
        "option3": "Kyle Korver",
        "option4": "Joe Ingles",
        "answer": "Joe Ingles",
        "right": "YES! In the 2017-2018 season, Joe Ingles made a tremendous 204 three pointers!"
    }, {
        "question": "Which of these players has NEVER been an all-star?",
        "option1": "Rudy Gobert",
        "option2": "Deron Williams",
        "option3": "Andrei Kirilenko",
        "option4": "Carlos Boozer",
        "answer": "Rudy Gobert",
        "right": "Correct! Although, he soon will be"
    }, {
        "question": "Which of these player was given the nickname 'Pistol'? ",
        "option1": "CJ Miles",
        "option2": "Pete Maravich",
        "option3": "Donovan Mitchell",
        "option4": "Jeff Hornacek",
        "answer": "Pete Maravich",
        "right": "Nice job! "
    }, {
        "question": "Which of these names has NEVER been a coach for the Utah Jazz?",
        "option1": "Frank Layden",
        "option2": "Tyrone Corbin",
        "option3": "Quin Snyder",
        "option4": "Jeff Van Gundy",
        "answer": "Jeff Van Gundy",
        "right": "Right! Jeff Van Gundy is a former NBA coach for several teams, however none of which were the Utah Jazz."
    }, {
        "question": "Which of these countries does not have a player currently playing for the Utah Jazz?",
        "option1": "Brazil",
        "option2": "France",
        "option3": "Australia",
        "option4": "Canada",
        "answer": "Canada",
        "right": "Absolutley! Brazil: Raul Neto, France: Rudy Gobert, Australia: Joe Ingles and Dante Exum."
    }, {
        "question": "During the 1993 All-Star Game held in Salt Lake City, who were the co-recipients for the game's MVP award? ",
        "option1": "Michael Jordan and Karl Malone",
        "option2": "Isiah Thomas and Shaquille O'Neal",
        "option3": "John Stockton and Karl Malone",
        "option4": "Charles Barkley and Michael Jordan",
        "answer": "John Stockton and Karl Malone",
        "right": "+1 for you! Karl Malone had 28 points and 10 rebounds, while Stockton posted 9 points to go along with 15 assists"
    }, {
        "question": "Bonus question: Did Jordan push off?",
        "option1": "Yes",
        "option2": "Yes",
        "option3": "Yes",
        "option4": "Yes",
        "answer": "Yes",
        "right": "You nailed it!"
    }]
    //---------------set-up functions------------------------------//
    function reset() {
        time = 15;
        count = true;
        intervalId = setInterval(timer, 1000);
        $(".guess").removeClass("clicked");
        $(".game").show();
        $(".results").hide();
        $(".againBtn").empty();
        $(".feedback").hide();
        $(".question").text(questions[currentSet].question);
        $(".option1").text(questions[currentSet].option1);
        $(".option2").text(questions[currentSet].option2);
        $(".option3").text(questions[currentSet].option3);
        $(".option4").text(questions[currentSet].option4);
    }
    function timer() {
        if (count == true) {
            $(".timer").text("Time left: " + time)
            time--;
        }
        if (time == -1) {
            unanswered++;
            currentSet++;
            if (totQuestions == currentSet) {
                results()
            }
            else {
                timesUp();
            }
        }
        if (count == false) {
            time = 15;
        }
    }
    function right() {
        count = false;
        clearInterval(intervalId);
        $(".timer").text("Time left: 15");
        $(".game").hide();
        $(".feedback").show();
        $(".feedback").text(questions[currentSet-1].right);
        if (totQuestions == currentSet) {
            setTimeout(results, 1000 * 3);
        }
        else
            setTimeout(reset, 1000 * 3);
    }
    function wrong() {
        count = false;
        clearInterval(intervalId)
        $(".timer").text("Time left: 15");
        $(".game").hide();
        $(".feedback").show();
        $(".feedback").text("Sorry, the correct answer was " + questions[currentSet - 1].answer);
        if (totQuestions == currentSet) {
            setTimeout(results, 1000 * 3);
        }
        else {
            setTimeout(reset, 1000 * 3);
        }
    }
    function timesUp(){
        count = false;
        clearInterval(intervalId);
        $(".game").hide();
        $(".feedback").show();
        $(".feedback").text("Times up! The correct answer was " + questions[currentSet-1].answer);
        if (totQuestions == currentSet) {
            setTimeout(results, 1000 * 3);
        }
        else {
            setTimeout(reset, 1000 * 3);
        }
    }
    function results() {
        count = false;
        clearInterval(intervalId);
        $(".game").hide();
        $(".feedback").hide();
        $(".results").show();
        $(".correct").text("Correct: " + correct);
        $(".incorrct").text("Incorrect: " + incorrect);
        $(".unanswered").text("Unanswered: " + unanswered);
        var playAgain = $("<button>");
        playAgain.text("Play Again");
        playAgain.addClass("btn");
        $(".againBtn").append(playAgain);
        $(playAgain).on("click", function () {
            currentSet = 0;
            correct = 0;
            incorrect = 0;
            unanswered = 0;
            reset();
        })
    }
    //----------------------------------------------------------------//
    $(".timer").hide();

    $(".btn").on("click", function () {
        $(".btn").hide();
        $(".timer").show();
        reset();
    })


    $(".guess").on("click", function () {
        if ($(this).text() == questions[currentSet].answer) {
            correct++;
            currentSet++;
            $(this).addClass("clicked");
            setTimeout(right, 1000 * .07)
        }
        else if ($(this).text() != questions[currentSet].answer) {
            incorrect++;
            currentSet++;
            $(this).addClass("clicked");
            setTimeout(wrong, 1000 * .07)
        }
    })

})