$(document).ready(function () {
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var currentSet = 0;
    var totQuestions = 7;
    var count = false
    var time = 9;
    var intervalId;
    var questions = [{
        "question": "Who was the Defensive Player of the year for the 2017-2018 season?",
        "option1": "Rudy Gobert",
        "option2": "Joel Embiid",
        "option3": "James Harden",
        "option4": "Anthony Davis",
        "answer": "Rudy Gobert"
    }, {
        "question": "Who has the record for most three-pointers made in a game?",
        "option1": "Steph Curry",
        "option2": "Shaq",
        "option3": "Klay Thompson",
        "option4": "Ray Allen",
        "answer": "Klay Thompson"
    }, {
        "question": "Who has the most career assists in NBA history?",
        "option1": "Jason Kidd",
        "option2": "John Stockton",
        "option3": "Steve Nash",
        "option4": "Magic Johnson",
        "answer": "John Stockton"
    }, {
        "question": "Who of these players has NOT won an MVP?",
        "option1": "Derrick Rose",
        "option2": "Scottie Pippen",
        "option3": "Tim Duncan",
        "option4": "Dirk Nowitski",
        "answer": "Scottie Pippen"
    }, {
        "question": "Who is the shortest player to ever play in the NBA?",
        "option1": "Earl Boykins",
        "option2": "Chris Paul",
        "option3": "Mugsy Bogues",
        "option4": "Manute Bol",
        "answer": "Mugsy Bogues"
    }, {
        "question": "Who is the winngest franchise is NBA history WITHOUT a championship?",
        "option1": "Phoenix Suns",
        "option2": "Oklahoma City Thunder",
        "option3": "Charlotte Hornets",
        "option4": "Utah Jazz",
        "answer": "Utah Jazz"
    }, {
        "question": "What University did all-star player Damian Lillard play for?",
        "option1": "Duke",
        "option2": "Weber State",
        "option3": "Stevens Hennager",
        "option4": "UCLA",
        "answer": "Weber State"
    }
    ]

    function reset() {
        count = true;
        time = 10;
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
        if (count == true) {
            $(".timer").text("Time left: " + time)}
        time--;
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
        $(".feedback").text("Sorry, the correct answer was " + questions[currentSet - 1].answer);
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
        playAgain.addClass("playAgain");
        playAgain.addClass("btn-primary");
        $(".againBtn").append(playAgain);
        $(".playAgain").on("click", function () {
            currentSet = 0;
            correct = 0;
            incorrect = 0;
            unanswered = 0;
            reset();
        })
    }

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