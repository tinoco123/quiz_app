const addQuestionButton = document.getElementById("submitQuestion");
const saveButton = document.getElementById("saveQuestionBank");
const questionBank = [];

function submitForm(event){
    event.preventDefault();
}

function getMyData(){
    const question = document.getElementById("q").value;
    const a = document.getElementById("a").value;
    const b = document.getElementById("b").value;
    const c = document.getElementById("c").value;
    const d = document.getElementById("d").value;
    const correctAnswer = document.getElementById("ca").value;
    const newData = { question, answers: { a, b, c, d }, correctAnswer }
    if(question != "" && a != "" && b != "" && c != "" && d != "" && correctAnswer != ""){
        questionBank.push(newData);
        document.getElementById('qCount').innerHTML = questionBank.length;
        document.getElementById("addQuestion").reset();
    }
    return questionBank;
}

function saveMyFile(){
    localStorage.setItem("questionBank", JSON.stringify(questionBank));
    location.replace("index.html")
}

const newObject = localStorage.getItem("questionBank");
let dataStored = JSON.parse(newObject);
if(dataStored != null || dataStored == ""){
    for(i=0; i < dataStored.length; i++){
        questionBank.push(dataStored[i]);
    }
}else {
    for(i=0; i < questions.length; i++){
        questionBank.push(questions[i]);
    }
}
document.getElementById('qCount').innerHTML = questionBank.length;
addQuestionButton.addEventListener("click", getMyData);
saveButton.addEventListener("click", saveMyFile);




