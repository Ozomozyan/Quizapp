// Importing necessary modules and data
const Question = require('../models/question');
const questions = require('../data/questions');

// Controller for displaying the quiz page
const displayQuiz = (req, res) => {
    res.render('quiz', { questions: questions });
};

// Controller for adding a new question
const addQuestion = (req, res) => {
    const options = [req.body.option1, req.body.option2, req.body.option3];
    let correctAnswers = req.body.correctAnswers;

    if (!correctAnswers || (Array.isArray(correctAnswers) && correctAnswers.length === 0)) {
        return res.send("Error: Please select at least one correct answer.");
    }

    if (!Array.isArray(correctAnswers)) {
        correctAnswers = [correctAnswers];
    }

    const correctAnswersText = correctAnswers.map(answer => req.body[answer]);

    const newQuestion = new Question(
        questions.length + 1,
        req.body.questionText,
        options,
        correctAnswersText
    );
    questions.push(newQuestion);
    res.redirect('/quiz');
};

// Controller for checking an answer
const checkAnswer = (req, res) => {
    const questionId = req.body.questionId;
    let selectedAnswers = req.body.answers;
    
    if (!Array.isArray(selectedAnswers)) {
        selectedAnswers = [selectedAnswers];
    }

    const question = questions.find(q => q.id == questionId);

    const isCorrect = question && 
                      selectedAnswers.every(ans => question.correctAnswers.includes(ans)) &&
                      question.correctAnswers.every(ans => selectedAnswers.includes(ans));

    res.send(`Answer is ${isCorrect ? 'correct' : 'incorrect'}.`);
};

// Exporting the controller functions
module.exports = {
    displayQuiz,
    addQuestion,
    checkAnswer
};
