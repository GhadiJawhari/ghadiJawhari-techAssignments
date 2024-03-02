const correctAnswers = {
    question1: "option2",
    question2: "option3",
    question3: "option1",
    question4: "option1",
    question5: "option1"
};
function calculateResult() {
    let totalScore = 0;
    for (let i = 1; i <=5; i++) {
        const selectedOption = document.querySelector(`#question${i} input[name="choice${i}"]:checked`);
        const correctOption = correctAnswers[`question${i}`];

        if (selectedOption && selectedOption.value === correctOption) {
            totalScore += 1;
        }
    }
    alert(`Your total score is: ${totalScore}`);
}

function validateEmail() {
    var emailInput = document.getElementById("email").value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(emailInput)) {
        window.open('questions.html','_blank');
       
    } else {
        alert("Please enter a valid email address!");
    }
}
var t = 240;
var time = document.getElementById("time");

setInterval(() => {
  var minutes = Math.floor(t / 60);
  var seconds = t % 60;
  var formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  time.textContent = formattedTime;
  t--;
  if(t==0){
    window.close('questions.html','_blank');
    window.open('index.html','_blank');
    alert("time is over");
  }

}, 1000);
