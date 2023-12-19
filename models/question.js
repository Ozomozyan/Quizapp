class Question {
    constructor(id, text, options, correctAnswers) {
        this.id = id;
        this.text = text;
        this.options = options; // Array of answer choices
        this.correctAnswers = correctAnswers; // Array of correct answers
    }
}


module.exports = Question;
