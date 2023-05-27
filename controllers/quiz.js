const Quiz = require('../models/quiz');

exports.createQuiz = async (req, res, next) => {
    try {
        const que = req.body.que;
        const ans = req.body.ans;
        const choice1 = req.body.choice1;
        const choice2 = req.body.choice2;
        const choice3 = req.body.choice3;
        const choice4 = req.body.choice4;
        const level = req.body.level;
        const quiz = new Quiz({
            question: que,
            choice_answer: [choice1,choice2,choice3,choice4],
            answer: ans,
            level: level
        });
        const question = await quiz.save();
        if(!question){
            const err = new Error('error found in creating question!');
            throw err;
        }
        res.status(201).json(question);
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
}


