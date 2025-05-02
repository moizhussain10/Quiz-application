var questions = [
    {
        question: "What does HTML stand for?",
        option1: "Hyperlinks and Text Markup Language",
        option2: "Hypertext Markup Language",
        option3: "Home Tool Markup Language",
        correctOption: "Hypertext Markup Language",
    },
    {
        question: "Who is making the Web standards?",
        option1: "Google",
        option2: "The World Wide Web Consortium",
        option3: "Microsoft",
        correctOption: "The World Wide Web Consortium",
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        option1: "<heading>",
        option2: "<h6>",
        option3: "<h1>",
        correctOption: "<h1>",
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        option1: "<linebreak>",
        option2: "<br>",
        option3: "<break>",
        correctOption: "<br>",
    },
    {
        question: "What is the correct HTML for adding a background color?",
        option1: '<body bg="yellow">',
        option2: "<background>yellow</background>",
        option3: '<body style="background-color:yellow;">',
        correctOption: '<body style="background-color:yellow;">',
    },
    {
        question: "Choose the correct HTML element to define important text:",
        option1: "<strong>",
        option2: "<b>",
        option3: "<i>",
        correctOption: "<strong>",
    },
    {
        question: "Choose the correct HTML element to define emphasized text:",
        option1: "<italic>",
        option2: "<i>",
        option3: "<em>",
        correctOption: "<em>",
    },
    {
        question: "What is the correct HTML for creating a hyperlink?",
        option1: "<a>http://www.w3schools.com</a>",
        option2: '<a href="http://www.w3schools.com">W3Schools</a>',
        option3: '<a url="http://www.w3schools.com">W3Schools.com</a>',
        correctOption: '<a href="http://www.w3schools.com">W3Schools</a>',
    },
];
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