const User = require('../models/user');

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
        const count = req.body.count;
        let point = req.body.point;

        const user = await User.findById(id);
        if(!user){
            const err = new Error('user not found!');
            throw err;
        }

        const prePoint = user.complete_quiz.point;
        point = point + prePoint;
        let pretotalPrice = user.totalPrice;

        if(point === 4){
            pretotalPrice = pretotalPrice + 1000;
        }
        
        user({
            complete_quiz: {
                count: count,
                point: point
            },

            totalPrice: {
                pretotalPrice
            }
        })


    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message: err.message
        })
    }
}