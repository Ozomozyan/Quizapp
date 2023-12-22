const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/', quizController.displayQuiz);
router.post('/add', quizController.addQuestion);
router.post('/check-answer', quizController.checkAnswer);

module.exports = router;
