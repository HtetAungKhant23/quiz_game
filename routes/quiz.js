const express = require('express');
const controller = require('../controllers/quiz');
const router = express.Router();

// localhost:5000/quiz/create
router.post('/create', controller.createQuiz);

// localhost:5000/quiz/get
router.get('/get', controller.getQuiz);



// router.get('/:quizId', controller.getQuizById);

module.exports = router;