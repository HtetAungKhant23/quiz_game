const User = require('../models/user');
const Quiz = require('../models/quiz');

exports.nextRound = async (req, res, next) => {
    try{
        const next = req.body.next;
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            const err = new Error('user not found!');
            throw err;
        }

        if (next === "true") {
            const count = Number(user.complete_quiz.count);
            if(4 < count < 7){
                res.status(200).json({
                    round: 2
                })
            }else if(count > 6){
                res.status(200).json({
                    round: 3
                })
            }
        }

        res.status(200).json({
            userData: user
        })

    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message: err.message
        })
    }
}

exports.getQuiz = async (req, res, next) => {
    try{
        const round = Number(req.params.round);
        const quiz = await Quiz.find();

        res.status(200).json(quiz);

        if(round === 1){
            const question = quiz[0].lvl_1.que_list;
        }





    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message: err.message
        })
    }



}

exports.postUser = async (req, res, next) => {
    try{
        const name = req.body.name;
        const userr = new User({
            name: name
        });
        const user = await userr.save();
        if(!user){
            const err = new Error('user cant create!');
        }
        res.status(200).json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message: err.message
        })
    }
}

exports.updateUser = async (req, res, next) => {
    try{
        const id = req.params.id;
        const answer = req.body.answer;

        const user = await User.findById(id);
        if(!user){
            const err = new Error('user not found!');
            throw err;
        }

        let prePoint = Number(user.complete_quiz.point);
        let count = Number(user.complete_quiz.count);
        count++;
        if(answer === "ture"){
            prePoint++;
        }
        let pretotalPrice = Number(user.totalPrice);

        if(prePoint === 3 && count === 3){
            pretotalPrice += 1000;
        } else if (prePoint === 5 && count === 5){
            pretotalPrice += 2000;
        } else if (prePoint === 6 && count === 6){
            pretotalPrice += 3000;
        }
        
        user.complete_quiz.count = count;
        user.complete_quiz.point = prePoint;
        user.totalPrice = pretotalPrice;

        const userUpd = await user.save();
        if(!userUpd){
            const err = new Error('cant updated!');
            throw err;
        }

        console.log('updated!');
        res.status(201).json(userUpd);

    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message: err.message
        })
    }
}