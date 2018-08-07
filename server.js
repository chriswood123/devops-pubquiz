const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const questions = [
    {
        id: 1,
        question: "What is DevOps?",
        answer: "culture"
    },
    {
        id: 2,
        question: "What is cloud?",
        answer: "computers"
    }
]

app.get('/', function(req, res){
    res.render('index', {
        result: null,
        question: questions[0]["question"],
        question_id: questions[0]["id"]
    });
})

app.listen(3000, function(){
    console.log('Ready to pubquiz!');
})