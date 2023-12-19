const express = require('express');
const router = express.Router();
const Question = require('../models/question'); // Import the Question class
const questions = require('../data/questions');

router.get('/', (req, res) => {
    res.render('quiz', { questions: questions });
});

router.post('/add', (req, res) => {
    const options = [req.body.option1, req.body.option2, req.body.option3];
    let correctAnswers = req.body.correctAnswers;

    // Check if at least one correct answer is selected
    if (!correctAnswers || (Array.isArray(correctAnswers) && correctAnswers.length === 0)) {
        // Redirect back to the form with an error message, or handle the error as needed
        return res.send("Error: Please select at least one correct answer.");
    }

    // Ensure correctAnswers is an array
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
});




router.post('/check-answer', (req, res) => {
    const questionId = req.body.questionId;
    let selectedAnswers = req.body.answers;
    
    // Ensure selectedAnswers is an array
    if (!Array.isArray(selectedAnswers)) {
        selectedAnswers = [selectedAnswers];
    }

    const question = questions.find(q => q.id == questionId);

    // Check if all selected answers are correct and if all correct answers are selected
    const isCorrect = question && 
                      selectedAnswers.every(ans => question.correctAnswers.includes(ans)) &&
                      question.correctAnswers.every(ans => selectedAnswers.includes(ans));

    res.send(`Answer is ${isCorrect ? 'correct' : 'incorrect'}.`);
});




module.exports = router;
