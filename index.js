const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const quizRouter = require('./routers/quizRouter');

app.get('/', (req, res) => {
    res.redirect('/quiz');
});


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

app.use('/quiz', quizRouter);
app.use(express.static('public'));


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
