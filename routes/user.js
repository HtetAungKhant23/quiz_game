const express = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/user');
const router = express.Router();
const User = require('../models/user');

// localhost:5000/user/create
router.post('/create', 
[
    body('email')
        .isEmail()
        .withMessage('email format is not correct!')
        .normalizeEmail()
        .custom((value, {req}) => {
            return User.findOne({email: value})
                .then(user => {
                    if(user){
                        return Promise.reject('Email already exist!');
                    }
                })
        }),
    body('password')
        .trim()
        .isLength({min: 6})
        .isUppercase()
        .isLowercase()
        .isAlphanumeric()
        .not()
        .isEmpty()
        .withMessage('password is not strong!')
        .custom((value, {req}) => {

        })
]
, controller.createUser);

// localhost:5000/user/getquiz
router.get('/getquiz', controller.getQuiz);

// localhost:5000/user/:id
router.patch('/:id', controller.updateUser);

module.exports = router;