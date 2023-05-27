// const User = require('../models/user');
// const Quiz = require('../models/quiz');

// exports.nextRound = async (req, res, next) => {
//     try{
//         const next = req.body.next;
//         const userId = req.params.userId;

//         const user = await User.findById(userId);
//         if (!user) {
//             const err = new Error('user not found!');
//             throw err;
//         }

//         if (next === "true") {
//             const count = Number(user.complete_quiz.count);
//             if(4 < count < 7){
//                 res.status(200).json({
//                     round: 2
//                 })
//             }else if(count > 6){
//                 res.status(200).json({
//                     round: 3
//                 })
//             }
//         }

//         res.status(200).json({
//             userData: user
//         })

//     }catch(err){
//         console.log(err.message);
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }

// exports.getQuiz = async (req, res, next) => {
//     try{
//         let round = req.body.round;
//         if(!round){
//             round = 1
//         }else{
//             round = Number(req.body.round);
//         }

//         const quiz = await Quiz.find();
//         if(!quiz){
//             const err = new Error('not found quiz');
//             throw err;
//         }

//         let question;
//         if(round === 1){
//             question = quiz[0].lvl_1.que_list;
//         }else if(round === 2){
//             question = quiz[0].lvl_2.que_list;
//         }else if(round === 3){
//             question = quiz[0].lvl_3.que_list;
//         }else{
//             res.status(404).json({
//                 message: 'error found'
//             })
//         }

//         res.status(200).json(question);

//     }catch(err){
//         console.log(err.message);
//         res.status(500).json({
//             message: err.message
//         })
//     }

// }

// exports.updateUser = async (req, res, next) => {
//     try{
//         const id = req.params.id;
//         const answer = req.body.answer;

//         const user = await User.findById(id);
//         if(!user){
//             const err = new Error('user not found!');
//             throw err;
//         }

//         let prePoint = Number(user.complete_quiz.point);
//         let count = Number(user.complete_quiz.count);
//         count++;
//         if(answer === "ture"){
//             prePoint++;
//         }
//         let pretotalPrice = Number(user.totalPrice);

//         if(prePoint === 3 && count === 3){
//             pretotalPrice += 1000;
//         } else if (prePoint === 5 && count === 5){
//             pretotalPrice += 2000;
//         } else if (prePoint === 6 && count === 6){
//             pretotalPrice += 3000;
//         }
        
//         user.complete_quiz.count = count;
//         user.complete_quiz.point = prePoint;
//         user.totalPrice = pretotalPrice;

//         const userUpd = await user.save();
//         if(!userUpd){
//             const err = new Error('cant updated!');
//             throw err;
//         }

//         console.log('updated!');
//         res.status(201).json(userUpd);

//     }catch(err){
//         console.log(err.message);
//         res.status(500).json({
//             message: err.message
//         })
//     }
// }

const User = require('../models/user');
const Quiz = require('../models/quiz');

exports.getQuiz = async (req, res, next) => {
    try {
        const lvl = req.query.lvl;
        console.log(lvl, typeof lvl);
        const quiz = await Quiz.find({ lvl: lvl });
        if (!quiz) {
            const err = new Error('not found quiz with this lvl');
            throw err;
        }
        const randQue = (ques) => {
            const randIdx = Math.floor(Math.random() * ques.length);
            const que = ques[randIdx];
            return que;
        }
        let result=[];
        for (let i=0; i<3; i++){
            result.push(randQue(quiz));
        }

        console.log(result);
        res.status(200).json(result);

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
        const count = Number(req.body.count);
        const point = Number(req.body.point);
        const user = await User.findById(userId);
        if(!user){
            const err = new Error('user not found!');
            throw err;
        }

        let totalPrice = user.totalPrice;
        switch(point){
            case 4:
                totalPrice += 1000;
                break;
            case 7:
                totalPrice += 2000;
                break;
            case 8:
                totalPrice += 3000;
                break;
        }

        user.count = count;
        user.point = point;
        user.totalPrice = totalPrice;

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


