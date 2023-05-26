const Quiz = require('../models/quiz');

exports.getQuiz = async (req, res, next) => {
    try{
        const allQuiz = await Quiz.find();
        // console.log(allQuiz[0].lvl_3.price);
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

exports.getQuizById = async (req, res, next) => {
    try{
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId);
        console.log(quiz);
        if(!quiz){
            const err = new Error('not found');
            throw err;
        }
        res.status(200).json(quiz);
    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message: err.message
        });
    }
}

exports.createQuiz = async (req, res, next) => {
    try {
        const que = req.body.que;
        const ans = req.body.ans;
        console.log(que, typeof(que));
        console.log(ans, typeof(ans));

        const quiz = new Quiz({
            lvl_1: {
                que_list: [
                    {
                        quiz: 'this is lvl1 question',
                        ans: [ans, ans, ans, ans]
                    },
                    {
                        quiz: 'this is lvl1 question',
                        ans: [ans, ans, ans, ans]
                    }
                ]
            },

            lvl_2: {
                que_list: [
                    {
                        quiz: 'this is lvl2 question',
                        ans: [ans, ans, ans, ans]
                    },
                    {
                        quiz: 'this is lvl2 question',
                        ans: [ans, ans, ans, ans]
                    }
                ]
            },

            lvl_3: {
                que_list: [
                    {
                        quiz: 'this is lvl3 question',
                        ans: [ans, ans, ans, ans]
                    },
                    {
                        quiz: 'this is lvl3 question',
                        ans: [ans, ans, ans, ans]
                    }
                ]
            }

        });
        const qui = await quiz.save();
        if (!qui) {
            const err = new Error('here is error occure!');
            err.statusCode = 401;
            throw err;
        }
        console.log('Created!');
        res.status(200).json(qui);
    } catch (err) {
        console.log(err.message);
    }
}


