const User = require('../models/user');
const Quiz = require('../models/quiz');

exports.getQuiz = async (req, res, next) => {
    try {
        const level = req.query.level;
        let size;
        if (level === 'easy'){
            size = 4;
        } else if (level === 'medium'){
            size = 3;
        } else if (level === 'hard'){
            size = 1;
        }
        const data = await Quiz.aggregate([{ $match: { level: level }},{$sample: { size: size } }]);
        res.status(200).json(data);
    } catch(err) {
        console.log(err.message);
        res.status(200).json(err.message);
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const name = req.body.name;
        const userr = new User({
            name: name
        });
        const user = await userr.save();
        if (!user) {
            const err = new Error('user cant create!');
        }
        res.status(201).json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: err.message
        })
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const complete_quiz = Number(req.body.complete_quiz);
        const point = Number(req.body.point);
        const user = await User.findById(userId);
        if(!user){
            const err = new Error('user not found!');
            throw err;
        }
        user.complete_quiz = complete_quiz;
        user.point = point;
        if(point > 7){
            user.totalPrice = 6000;
        }else if(point > 6){
            user.totalPrice = 3000;
        }else if(point > 3){
            user.totalPrice = 1000;
        }
        const updUser = await user.save();
        if(!updUser){
            const err = new Error('user cant updated!');
            throw err;
        }
        res.status(200).json(updUser);
    }catch(err) {
        console.log(err.message);
        res.status(500).json({
            message: err.message
        })
    }
}


