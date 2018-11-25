$(document).ready(function () {
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var currentSet = 0;


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
        "answer": "3"
    }, {
        "question": "Who has the most career assists in NBA history?",
        "option1": "Jason Kidd",
        "option2": "John Stockton",
        "option3": "Steve Nash",
        "option4": "Magic Johnson",
        "answer": "2"
    }
    ]



    $(".btn").on("click", function () {
        $(".btn").hide();
        nextQuestion();
    })



    function nextQuestion() {
        $(".question").text(questions[currentSet].question);
        $(".option1").text(questions[currentSet].option1);
        $(".option2").text(questions[currentSet].option2);
        $(".option3").text(questions[currentSet].option3);
        $(".option4").text(questions[currentSet].option4);

        $(".guess").on("click", function () {
            if ($(this).text() == questions[currentSet].answer) {
                correct++
                currentSet++
            }
            else if ($(this).text() != questions[currentSet].answer) {
                incorrect++;
                currentSet++
            }
            nextQuestion();
        })
    }
})