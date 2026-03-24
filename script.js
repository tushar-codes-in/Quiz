const questions = [
        {
          question:"What does HTML stand for?",
          answers:[
          {text:"Hyper Text Markup Language" ,correct:true,},
          {text:"Hyper Trainer Marking Language" ,correct:false , reason:"HTML stands for Hyper Text Markup Language."},
          {text:"Hyper Text Markup Language" ,correct:false , reason:"HTML stands for Hyper Text Markup Language."},
          {text:"Hyper Text Markup Language", correct:false , reason:"HTML stands for Hyper Text Markup Language."},
          ]
        } ,
        {
          question:"Which HTML tag is used to create a hyperlink?",
          answers:[
          {text:"link", correct:false,reason:"Used for linking external resources like CSS, not hyperlinks."},
          {text:"a", correct:true},
          {text:"href" ,correct:false,reason:"Not a valid HTML tag; href is an attribute."},
          {text:"hyper" ,correct:false,reason:"No such HTML tag exists."},
          ]
        },
        {
          question:"Which CSS property is used to change text color?",
          answers:[
          {text:"font-color" ,correct:false,reason:"Not a valid CSS property."},
          {text:"text-color", correct:false,reason:"Incorrect property name; CSS uses color"},
          {text:"color", correct:true},
          {text:"background-color" ,correct:false,reason:"Changes background, not text color."},
          ]
        },
        {
            question:"How do you select an element with id 'header' in CSS?",
            answers:[
            {text:".header" ,correct:false,reason:"This selects a class, not an id."},
            {text:"#header" ,correct:true},
            {text:"*header", correct:false,reason:"Invalid selector."},
            {text:"header", correct:false,reason:"Selects HTML tag <header>, not id."},
            ]
        },
        {question:"Which JavaScript keyword is used to declare a variable?",
            answers:[
            {text:"var" ,correct:false,reason:"Valid, but not complete answer since others also work"},
            {text:"let" ,correct:false,reason:"Also valid, but not the only one."},
            {text:"const" ,correct:false,reason:"Also valid, but not the only one."},
            {text:"All of the above" ,correct:true},
            ]
        },
        {question:"What will this output? console.log(typeof []);",
            answers:[
            {text:"object", correct: true},
            {text:"array" ,correct: false,reason:"JavaScript treats arrays as objects internally."},
            {text:"list" ,correct: false,reason:"Not a JavaScript type."},
            {text:"undefined" ,correct: false,reason:"Incorrect; array has a defined type."},
            ]
        },
        {question:"Which HTML tag is used to insert an image?",
            answers:[
            {text:"image" ,correct: false,reason:"Not a valid HTML tag."},
            {text:"img" ,correct: true},
            {text:"src" ,correct: false,reason:"Attribute, not a tag."},
            {text:"pic" ,correct: false,reason:"Does not exist in HTML."},
            ]
        },
        {question:"Which CSS property controls spacing inside an element?",
            answers:[
            {text:"margin" ,correct:false,reason:"Controls space outside the element."},
            {text:"padding" ,correct:true},
            {text:"border-spacing", correct:false,reason:"Used for table spacing."},
            {text:"spacing" ,correct:false,reason:"Not a valid CSS property."},
            ]
        },
        {question:"What is the correct way to write a JavaScript function?",
            answers:[
            {text:"function = myFunc()", correct:false,reason:"Incorrect syntax."},
            {text:"def myFunc()", correct:false,reason:"Python syntax, not JavaScript."},
            {text:"create myFunc()", correct:false,reason:"Invalid keyword."},
            {text:"function myFunc()", correct:true},
            ]
        },
        {question:"Which method is used to select an element in JavaScript?",
            answers:[
            {text:"getElementById()" ,correct:false,reason:"Correct, but not the only method."},
            {text:"querySelector()" ,correct:false,reason:"Also correct, but not the only one."},
            {text:"Both A and B" ,correct:true},
            {text:"selectElement()", correct:false,reason:"Not a valid JavaScript method."},
            ]
        },

        
      ]
      const questionElement = document.getElementById("question");
      const answerButtons = document.getElementById("answer-button");
      const nextButton = document.getElementById("nextBtn");
      const reasonButton=document.getElementById("r1");

      let currentQuestionIndex=0;
      let score=0;

      function startQuiz(){
        currentQuestionIndex=0;
        score=0;
        nextButton.innerHTML = "Next";
        reasonButton.innerHTML=
        showQuestion();
      }
      function showQuestion() {
        resetState();
        let currentQuestion =questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.className = "bg-fuchsia-700 hover:bg-sky-600 py-4 rounded-xl";
            if (answer.correct) {
            button.dataset.correct = "true";
        } else {
            button.dataset.reason = answer.reason;
        }

        button.addEventListener("click", selectAnswer);
            answerButtons.appendChild(button);
           
        });
      }
      function resetState(){
        nextButton.style.display = "none" ;
        while(answerButtons.firstChild){
            (answerButtons.removeChild(answerButtons.firstChild));}
      }

      function selectAnswer(e){
        const selectedBtn= e.target;
        const isCorrect = selectedBtn.dataset.correct=== "true";
        if (isCorrect){
            score++;
            selectedBtn.classList.add("correct");
            selectedBtn.classList.add("bg-green-700");
            reasonButton.classList.remove("hidden");
            reasonButton.classList.add("bg-green-700");
            reasonButton.innerHTML="CORRECT";
        }else {
            selectedBtn.classList.add("incorrect");
            selectedBtn.classList.add("bg-red-800");
            reasonButton.classList.remove("hidden");
            reasonButton.classList.add("bg-green-700");
            reasonButton.innerHTML= selectedBtn.dataset.reason;

        }
        Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        } button.disabled =true;
        })
        nextButton.style.display = "block";

      }
      function showScore(){
        resetState();
        reasonButton.classList.add("hidden");
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
        nextButton.innerHTML="try again";
        nextButton.style.display = "block";
      }

      function handleNextButton(){
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length){
            showQuestion();
        }else{
            showScore();
        }
      }

      nextButton.addEventListener("click",()=>{
        if(currentQuestionIndex < questions.length) {
            handleNextButton();
        }else{
            startQuiz();

        }
      })
      startQuiz();