const Quiz = require('../models/quiz');

exports.getQuiz = async (req, res, next) => {
    try{
        const allQuiz = await Quiz.find();
        if(!allQuiz){
            const err = new Error('Here is error!');
            throw err;
        }
        res.status(200).json(allQuiz);
    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message: err.message
        });
    }
}

// exports.getQuizById = async (req, res, next) => {
//     try{
//         const quizId = req.params.quizId;
//         const quiz = await Quiz.findById(quizId);
//         console.log(quiz);
//         if(!quiz){][[]]
//             const err = new Error('not found');
//             throw err;
//         }
//         res.status(200).json(quiz);
//     }catch(err){
//         console.log(err.message);
//         res.status(500).json({
//             message: err.message
//         });
//     }
// }

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
            choice: [choice1,choice2,choice3,choice4],
            answer: ans,
            lvl: level
        });

        const question = await quiz.save();
        if(!question){
            const err = new Error('error found in creating question!');
            throw err;
        }

        res.status(201).json(question);
        
    } catch (err) {
        console.log(err.message);
    }
}


