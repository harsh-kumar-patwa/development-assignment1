let questions = [
    {
      question: "Which HTML tag is used to define an inline style?",
      choice1: "<script>",
      choice2: "<css>",
      choice3: "<style>",
      choice4: "<span>",
      answer: "3",
    },
    {
      question: "Which property is used to change the text color in CSS?",
      choice1: "text-color",
      choice2: "font-color",
      choice3: "text-style",
      choice4: "color",
      answer: "4",
    },
    {
      question: "Which of the following is the correct way to comment in HTML?",
      choice1: "// Comment",
      choice2: "<!-- Comment -->",
      choice3: "/* Comment */",
      choice4: "<! Comment>",
      answer: "2",
    },
  ];
const total = questions.length;
let currentAnswer = null;
var attemptedQuestions = 1;

function setRandomQuestion(currentQuestionIndex) {
  const selectedQuestion = questions[currentQuestionIndex];
  currentAnswer = selectedQuestion.answer;

  document.querySelector(".question h1").textContent = selectedQuestion.question;
  document.getElementById("choice1").textContent = selectedQuestion.choice1;
  document.getElementById("choice2").textContent = selectedQuestion.choice2;
  document.getElementById("choice3").textContent = selectedQuestion.choice3;
  document.getElementById("choice4").textContent = selectedQuestion.choice4;
}
var score = 0;
function displayNextQuestion() {
  questions.splice(currentQuestionIndex, 1);
  if (questions.length === 0) {
    // console.log("No more questions.");

    localStorage.setItem("score", score);
    window.location.href = "./final_Score.html";
    return;
  }
  currentQuestionIndex = Math.floor(Math.random() * questions.length);
  setRandomQuestion(currentQuestionIndex);
}

let currentQuestionIndex = 0;
setRandomQuestion(currentQuestionIndex);

// Add event listeners to each choice
for (let i = 1; i <= 4; i++) {
  const choice = document.getElementById("choice" + i);
  document.getElementById("choice" + i).addEventListener("click", function() {
    if (currentAnswer == String(i)) {
      score+=10;
      // console.log("right");
      choice.classList.add("correct");
    } else {
      // console.log("wrong");
      choice.classList.add("wrong");
    }

    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = (attemptedQuestions / total * 100) + '%';
    attemptedQuestions++;
    document.querySelector(".attempted h2").textContent=attemptedQuestions+"/"+total;
    document.querySelector(".score h2").textContent=score;

    
    
    if(attemptedQuestions>total){
      attemptedQuestions--;
      document.querySelector(".attempted h2").textContent=attemptedQuestions+"/"+total;
      progressBar.style.width = (attemptedQuestions / total * 100) + '%';
    }
    setTimeout(function(){
      choice.classList.remove("correct");
      choice.classList.remove("wrong");
      displayNextQuestion();
    }, 500);
  });
}