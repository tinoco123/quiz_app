function buildQuiz(){
    const output = [];
    questionBank.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        for(letter in currentQuestion.answers){
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}"
                    value="${letter}" class="rad_butn">
                    ${letter} :
                    ${currentQuestion.answers[letter]}
                </label>`);
        }
        output.push(
            `<div class="slide">
                <div class="question"> ${(questionNumber + 1)}. ${currentQuestion.question}</div>
                <div class="answers"> ${answers.join("")} </div>
            </div>`
        );
    });
    quizBox.innerHTML = output.join('');
}

const questionBank = [];
const newObject = localStorage.getItem("questionBank");
let dataStored = JSON.parse(newObject);

if(dataStored.length > 0){
    for(i=0; i < dataStored.length; i++){
        console.log(i);
        console.log(dataStored[i]);
        questionBank.push(dataStored[i]);
    }
}else {
    for(i=0; i < questions.length; i++){
        questionBank.push(questions[i]);
    }
}
document.getElementById("quizLength").innerHTML = questionBank.length


const quizBox = document.getElementById('quiz');
const resultsBox = document.getElementById('results');
const submitButton = document.getElementById('submit');

buildQuiz();
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
showSlide(currentSlide);

function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
        previousButton.style.display = 'none';
    }
    else{
        previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
    }

function showNextSlide() {
    showSlide(currentSlide + 1);
}
function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

function showResults(){
    const answerBoxs = quizBox.querySelectorAll('.answers');
    let numCorrect = 0;
    questionBank.forEach( (currentQuestion, questionNumber) => {
        const answerBox = answerBoxs[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerBox.querySelector(selector) || {}).value;
        if(userAnswer === currentQuestion.correctAnswer){
            numCorrect++;
            answerBoxs[questionNumber].style.color = 'green';
        }
        else{
            answerBoxs[questionNumber].style.color = 'red';
        }
    });
    resultsBox.innerHTML = `${numCorrect} out of ${questionBank.length}`;
}





submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);


    