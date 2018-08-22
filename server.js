const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.score = 0;
app.locals.questions = [
    {
        question: "What is DevOps?",
        answer: "culture"
    },
    {
        question: "What is cloud?",
        answer: "computers"
    },
    {
        question: "Windows or Linux?",
        answer: "Linux"
    }
]

app.get('/', function(req, res){
    let questions = app.locals.questions;
    res.render('index', {
        result: null,
        question: questions[0]['question'],
        question_id: 0
    });
})

app.post('/', function(req, res){
    let questions = app.locals.questions;
    let answer = req.body.answer;
    let question_id = req.body.question_id;
    let next_question_id = Number(question_id) + 1;

    if (answer == questions[question_id]['answer']) {
        app.locals.score = Number(app.locals.score) + 1;
        var result = "CORRECT!";
    } else {
        var result = "INCORRECT!";
    }

    if (questions.length == next_question_id) {
        var result = `END OF QUIZ! You scored ${app.locals.score} out of ${questions.length}`;
        var next_question = null;
        app.locals.score = 0;
    } else {
        var next_question = questions[next_question_id]['question'];
    }

    res.render('index', {
        result: result,
        question: next_question,
        question_id: next_question_id
    });
})

app.listen(3000, function(){
    console.log('Ready to pubquiz!');
})