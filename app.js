let questions = [];
let currentQuestionIndex = null;

document.getElementById('newQuestionForm').addEventListener('submit', addQuestion);
document.getElementById('responseForm').addEventListener('submit', addResponse);
document.getElementById('resolveBtn').addEventListener('click', resolveQuestion);
document.getElementById('backToFormBtn').addEventListener('click', goBackToQuestionForm);

function addQuestion(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const question = document.getElementById('question').value;

    const newQuestion = {
        title,
        question,
        responses: []
    };

    questions.push(newQuestion);
    renderQuestions();
    document.getElementById('newQuestionForm').reset();
}

function renderQuestions() {
    const questionList = document.getElementById('questions');
    questionList.innerHTML = '';

    questions.forEach((q, index) => {
        const li = document.createElement('li');
        li.textContent = q.title;
        li.onclick = () => displayQuestionDetails(index);
        questionList.appendChild(li);
    });
}

function displayQuestionDetails(index) {
    currentQuestionIndex = index;
    const question = questions[index];

    document.getElementById('questionTitle').textContent = question.title;
    document.getElementById('questionText').textContent = question.question;

    renderResponses();
    document.getElementById('questionForm').classList.add('hidden');
    document.getElementById('questionDetails').classList.remove('hidden');
    document.getElementById('backToFormBtn').classList.remove('hidden');
}

function renderResponses() {
    const responsesDiv = document.getElementById('responses');
    responsesDiv.innerHTML = '';

    const currentQuestion = questions[currentQuestionIndex];
    currentQuestion.responses.forEach(response => {
        const responseDiv = document.createElement('div');
        responseDiv.innerHTML = `<strong>${response.name}</strong>: ${response.comment}`;
        responsesDiv.appendChild(responseDiv);
    });
}

function addResponse(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    const response = {
        name,
        comment
    };

    questions[currentQuestionIndex].responses.push(response);
    renderResponses();
    document.getElementById('responseForm').reset();
}

function resolveQuestion() {
    alert('This question has been resolved.');
}

function goBackToQuestionForm() {
    document.getElementById('questionDetails').classList.add('hidden');
    document.getElementById('backToFormBtn').classList.add('hidden');
    document.getElementById('questionForm').classList.remove('hidden');
}
