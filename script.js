var htmlques = document.getElementById('ques');
var htmlopt1 = document.getElementById('opt1');
var htmlopt2 = document.getElementById('opt2');
var htmlopt3 = document.getElementById('opt3');
var timer = document.getElementById("timer");
var getBtn = document.getElementById('btn');

var count_down = 60;
var interval;
var index = 0;
var score = 0;
var questions = [];

function startQuizApp() {
    fetch("https://the-trivia-api.com/v2/questions")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            questions = data.map(function (item) {
                // 1. Shuffle incorrect answers
                let incorrect = item.incorrectAnswers.sort();

                // 2. Pick 2 random incorrect
                let selectedIncorrect = incorrect.slice(0, 2);

                // 3. Add correct answer
                let options = [...selectedIncorrect, item.correctAnswer];

                // 4. Shuffle all 3 options
                options = options.sort();

                // 5. Return formatted question
                return {
                    question: item.question.text,
                    option1: options[0],
                    option2: options[1],
                    option3: options[2],
                    correctOption: item.correctAnswer
                };
            });


    console.log(questions)

    firstQuestion();
    startTimer();
});
}

function firstQuestion() {
    var q = questions[index];
    htmlques.innerText = q.question;
    htmlopt1.innerText = q.option1;
    htmlopt2.innerText = q.option2;
    htmlopt3.innerText = q.option3;

    var inputs = document.getElementsByName('quiz');
    inputs[0].value = q.option1;
    inputs[1].value = q.option2;
    inputs[2].value = q.option3;

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
    }

    getBtn.disabled = true;
}

function startTimer() {
    interval = setInterval(function () {
        count_down--;
        timer.innerHTML = count_down;

        if (count_down === 0) {
            clearInterval(interval);
            showResult();
        }
    }, 1000);
}

function btnWork() {
    getBtn.disabled = false;
}

function nextQuestion() {
    var selected = document.querySelector('input[name="quiz"]:checked');

    if (selected) {
        if (selected.value === questions[index].correctOption) {
            score++;
        }
    }

    index++;

    if (index >= questions.length) {
        showResult();
    } else {
        firstQuestion();
    }
}

function showResult() {
    Swal.fire({
        title: "Quiz Completed!",
        text: `Your score is ${score} out of ${questions.length}`,
        icon: "success"
    });

    setTimeout(function () {
        restartQuiz();
    }, 2000);
}

function restartQuiz() {
    index = 0;
    score = 0;
    count_down = 60;
    clearInterval(interval);
    startQuizApp();
}

// Start the quiz app when page loads
startQuizApp();
