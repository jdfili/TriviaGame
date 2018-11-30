$(document).ready(function () {
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var currentSet = 0;
    var totQuestions = 8;
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
        "wrong": "Sorry, the correct answer was Karl Malone"
    }, {
        "question": "Who has the most three-pointers made in a season, in franchise history?",
        "option1": "Gordon Hayward",
        "option2": "Mehmet Okur",
        "option3": "Kyle Korver",
        "option4": "Joe Ingles",
        "answer": "Joe Ingles",
        "wrong": "Uh-oh you friccin moron, the correct answer was Joe Ingles!"
    }, {
        "question": "Which of these players has NEVER been an all-star?",
        "option1": "Rudy Gobert",
        "option2": "Deron Williams",
        "option3": "Andrei Kirilenko",
        "option4": "Carlos Boozer",
        "answer": "Rudy Gobert",
        "wrong": "WRONG! La bonne réponse était Rudy Gobert"
    }, {
        "question": "Which of these player was given the nickname 'Pistol'? ",
        "option1": "CJ Miles",
        "option2": "Pete Maravich",
        "option3": "Donovan Mitchell",
        "option4": "Jeff Hornacek",
        "answer": "Pete Maravich",
        "wrong": "Nope! The correct answer was Pete Maravich. Dont worry I'll forgive you this time..."
    }, {
        "question": "Which of these names has NEVER been a coach for the Utah Jazz?",
        "option1": "Frank Layden",
        "option2": "Tyrone Corbin",
        "option3": "Quin Snyder",
        "option4": "Andy Larsen",
        "answer": "Andy Larsen",
        "wrong": "Incorrect...I don't know if I can forgive you for this one"
    }, {
        "question": "Which of these countries does not have a player currently playing for the Utah Jazz?",
        "option1": "Brazil",
        "option2": "France",
        "option3": "Australia",
        "option4": "Canada",
        "answer": "Canada",
        "wrong": "Wrong! Brazil: Raul Neto, France: Rudy Gobert, Australia: Joe Ingles, and Dante Exum"
    }, {
        "question": "During the 1993 All-Star Game held in Salt Lake City, who were the co-recipients for the game's MVP award? ",
        "option1": "Michael Jordan and Karl Malone",
        "option2": "Isiah Thomas and Shaquille O'Neal",
        "option3": "John Stockton and Karl Malone",
        "option4": "Charles Barkley and Michael Jordan",
        "answer": "John Stockton and Karl Malone",
        "wrong": "Sorry, the answer was John Stockton and Karl Malone. Karl Malone had 28 points and 10 rebounds, while Stockton posted 9 points to go along with 15 assists"
    }, {
        "question": "Bonus question: Did Jordan push off?",
        "option1": "Yes",
        "option2": "Yes",
        "option3": "Yes",
        "option4": "Yes",
        "answer": "Yes"
    }
    ]
    //---------------set-up functions------------------------------//
    function reset() {
        time = 10;
        count = true;
        intervalId = setInterval(timer, 1000);
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
        count = true;
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
                wrong();
            }
        }
    }
    function right() {
        count = false;
        clearInterval(intervalId);
        $(".game").hide();
        $(".feedback").show();
        $(".feedback").text("You got it!");
        if (totQuestions == currentSet) {
            setTimeout(results, 1000 * 3);
        }
        else
            setTimeout(reset, 1000 * 3);
    }
    function wrong() {
        count = false;
        clearInterval(intervalId)
        $(".game").hide();
        $(".feedback").show();
        $(".feedback").text(questions[currentSet - 1].wrong);
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
        playAgain.addClass("btn-primary");
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
            right();

        }
        else if ($(this).text() != questions[currentSet].answer) {
            incorrect++;
            currentSet++;
            wrong()
        }
    })

})