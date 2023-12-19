const Question = require('../models/question');

const questions = [
    new Question(1, 'In Angular js, what is the purpose of a service ?', ['To change the style of HTML elements', 'To share data and functionality across components', 'To enhance the speed of the application'], ['To share data and functionality across components']),
    new Question(2, 'What does the PHP function isset() do ?', ['Checks if a variable is of a certain type', 'Returns the length of a string', 'Determines if a variable is set and is not NULL'], ['Determines if a variable is set and is not NULL'])   
];

module.exports = questions;
