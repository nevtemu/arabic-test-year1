import {questions} from "./questions.js"
let totallyAnswered = 0, correctlyAnswered = 0;
let question, questionIndex, correctAnswer, wrongAnswer;
const previousQuestions = [, , , , ,];

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const shuffle = array => { //this function only shuffles items in array. Required later for random positioning of correct answer in the list
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const askQuestion = () => {
  let answers = [];
  do {questionIndex = getRandomNumber(0, questions.length);} //select random word from questions array
  while (previousQuestions.includes(questionIndex)); // this ensures that same question is not asked few times in a row
  question = questions[questionIndex][0]; // question hint that will be displayed in English
  correctAnswer = questions[questionIndex][1]; //correct answer that will be added to answers list in Arabic
  answers.push(correctAnswer);
  previousQuestions.push(questionIndex);
  previousQuestions.shift();
  document.getElementById("question").innerHTML = question;
  // document.getElementById("picture").src = "snake.jpg";
  document.getElementById("picture").src = "../src/ara/" + question.toString().toLowerCase() + ".jpg";
  let radios = document.getElementsByName("answers"); //reset radio buttons
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      radios[i].checked = false;
    }
  }
  for (let i = 1; i <= 5; i++) { //this cycle generates random 5 wrong answers for the test. Wrongs answers pulled from word list (const questions)
    do {wrongAnswer = questions[getRandomNumber(0, questions.length)][1];} 
    while (answers.includes(wrongAnswer) | (correctAnswer == wrongAnswer));
    answers.push(wrongAnswer);
  }
  shuffle(answers); // randomly position correct answer
  for (let i = 0; i <= 5; i++) { // this cycle through answers to display all of them on the page
    document.getElementById(`answerLabel${i}`).innerHTML = answers[i];
  }
}

const checkAnswer = () => {
  let radios = document.getElementsByName("answers");
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) { // checks if any answer selected
      totallyAnswered++;
      document.getElementById("totallyAnswered").innerHTML = `Answered questions: ${totallyAnswered}`;
      answer = document.getElementById(`answerLabel${i}`).innerHTML;
      if (answer == correctAnswer) { //correct answer
        correctlyAnswered++;
      } else { //wrong answer
        document.getElementById("textMistakes").innerHTML +=`[${question.replaceAll(" ","&nbsp")}&nbsp${correctAnswer.replaceAll(" ","&nbsp")}] `;
      }
      document.getElementById("correctAnswered").innerHTML =`Correct answers: ${Math.floor((correctlyAnswered / totallyAnswered) * 100)}%`;
      askQuestion(); //automatically ask next question
    }
  }
}
askQuestion();

