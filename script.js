const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyper Trainer Marking Language", correct: false, reason: "HTML stands for Hyper Text Markup Language." },
      { text: "Hyper Text Mechanic Language", correct: false, reason: "HTML stands for Hyper Text Markup Language." },
      { text: "Hyper Text Machine Language", correct: false, reason: "HTML stands for Hyper Text Markup Language." }
    ]
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    answers: [
      { text: "link", correct: false, reason: "Used for linking external resources like CSS, not hyperlinks." },
      { text: "a", correct: true },
      { text: "href", correct: false, reason: "Not a valid HTML tag; href is an attribute." },
      { text: "hyper", correct: false, reason: "No such HTML tag exists." }
    ]
  },
  {
    question: "Which CSS property is used to change text color?",
    answers: [
      { text: "font-color", correct: false, reason: "Not a valid CSS property." },
      { text: "text-color", correct: false, reason: "Incorrect property name; CSS uses color" },
      { text: "color", correct: true },
      { text: "background-color", correct: false, reason: "Changes background, not text color." }
    ]
  },
  {
    question: "How do you select an element with id 'header' in CSS?",
    answers: [
      { text: ".header", correct: false, reason: "This selects a class, not an id." },
      { text: "#header", correct: true },
      { text: "*header", correct: false, reason: "Invalid selector." },
      { text: "header", correct: false, reason: "Selects HTML tag <header>, not id." }
    ]
  },
  {
    question: "Which JavaScript keyword is used to declare a variable?",
    answers: [
      { text: "var", correct: false, reason: "Valid, but not the only one." },
      { text: "let", correct: false, reason: "Also valid." },
      { text: "const", correct: false, reason: "Also valid." },
      { text: "All of the above", correct: true }
    ]
  },
  {
    question: "What will this output? console.log(typeof []);",
    answers: [
      { text: "object", correct: true },
      { text: "array", correct: false, reason: "JavaScript treats arrays as objects internally." },
      { text: "list", correct: false, reason: "Not a JavaScript type." },
      { text: "undefined", correct: false, reason: "Incorrect." }
    ]
  },
  {
    question: "Which HTML tag is used to insert an image?",
    answers: [
      { text: "image", correct: false, reason: "Not a valid HTML tag." },
      { text: "img", correct: true },
      { text: "src", correct: false, reason: "Attribute, not a tag." },
      { text: "pic", correct: false, reason: "Does not exist in HTML." }
    ]
  },
  {
    question: "Which CSS property controls spacing inside an element?",
    answers: [
      { text: "margin", correct: false, reason: "Controls outside spacing." },
      { text: "padding", correct: true },
      { text: "border-spacing", correct: false, reason: "Used for tables." },
      { text: "spacing", correct: false, reason: "Invalid property." }
    ]
  },
  {
    question: "What is the correct way to write a JavaScript function?",
    answers: [
      { text: "function = myFunc()", correct: false, reason: "Incorrect syntax." },
      { text: "def myFunc()", correct: false, reason: "Python syntax." },
      { text: "create myFunc()", correct: false, reason: "Invalid keyword." },
      { text: "function myFunc()", correct: true }
    ]
  },
  {
    question: "Which method is used to select an element in JavaScript?",
    answers: [
      { text: "getElementById()", correct: false, reason: "Correct but not the only one." },
      { text: "querySelector()", correct: false, reason: "Also correct." },
      { text: "Both A and B", correct: true },
      { text: "selectElement()", correct: false, reason: "Invalid method." }
    ]
  }
];

// ELEMENTS
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("nextBtn");
const reasonButton = document.getElementById("r1");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");

// STATE
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let answered = false;
let showResult = false;
let quizFinished = false;

// START QUIZ
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  questionElement.classList.remove("hidden");
  answerButtons.classList.remove("hidden");

  showQuestion();
}

// SHOW QUESTION
function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.className = "bg-fuchsia-700 hover:bg-sky-600 py-4 rounded-xl cursor-pointer";

    if (answer.correct) button.dataset.correct = "true";
    else button.dataset.reason = answer.reason;

    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

// RESET STATE
function resetState() {
  nextButton.innerHTML = "Next";
  nextButton.style.display = "none";
  reasonButton.classList.add("hidden");

  answered = false;
  selectedAnswer = null;
  showResult = false;

  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// SELECT ANSWER (can change before Next)
function selectAnswer(e) {
  Array.from(answerButtons.children).forEach(btn =>
    btn.classList.remove("bg-blue-700")
  );

  selectedAnswer = e.target;
  answered = true;

  selectedAnswer.classList.add("bg-blue-700");
  nextButton.style.display = "block";
}

// MAIN BUTTON LOGIC
nextButton.addEventListener("click", () => {

  // 👉 TRY AGAIN
  if (quizFinished) {
    quizScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    quizFinished = false;
    return;
  }

  // 👉 SHOW RESULT
  if (!showResult) {

    if (!answered) {
      alert("Select an answer!");
      return;
    }

    const isCorrect = selectedAnswer.dataset.correct === "true";

    if (isCorrect) {
      score++;
      selectedAnswer.classList.replace("bg-blue-700", "bg-green-700");

      reasonButton.innerHTML = "CORRECT";
      reasonButton.className = "bg-green-700 px-6 py-3 rounded-xl mb-6";
    } else {
      selectedAnswer.classList.replace("bg-blue-700", "bg-red-700");

      reasonButton.innerHTML = selectedAnswer.dataset.reason;
      reasonButton.className = "bg-red-700 px-6 py-3 rounded-xl mb-6";
    }

    Array.from(answerButtons.children).forEach(btn => {
      if (btn.dataset.correct === "true") {
        btn.classList.add("bg-green-700");
      }
      btn.disabled = true;
    });

    nextButton.innerHTML = "Continue";
    showResult = true;
  }

  // 👉 NEXT QUESTION
  else {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
});

// SHOW SCORE
function showScore() {
  resetState();

  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

  nextButton.innerHTML = "Try Again";
  nextButton.style.display = "block";

  quizFinished = true;
}