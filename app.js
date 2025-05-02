var htmlques = document.getElementById('ques');
var htmlopt1 = document.getElementById('opt1');
var htmlopt2 = document.getElementById('opt2');
var htmlopt3 = document.getElementById('opt3');
var count_down = 60
var timer = document.getElementById("timer")
var interval;

var getBtn = document.getElementById('btn');
var index = 0;
var score = 0;

function starttimer(){
    interval = setInterval(function(){
        count_down--

        timer.innerHTML = count_down

        if(count_down === 0){
            clearInterval(interval)
            showresult()
        }
    },1000)

}   
starttimer()

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

firstQuestion(); 

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
        showresult()
    } else {
        firstQuestion();
    }
}

function showresult(){
    Swal.fire({
        title: "Quiz Completed!",
        text: `Your score is ${score} out of ${questions.length}`,
        icon: "success",
        restartquiz: "Restart Quiz"
    });
    
    setTimeout(function(){
        Restart()
    }, 2000);
}

function Restart(){
    index=0
    score=0
    count_down=60
    starttimer()
    firstQuestion()
}