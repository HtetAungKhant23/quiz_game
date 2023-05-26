const express = require('express');
const controller = require('../controllers/quiz');
const router = express.Router();

router.post('/create', controller.createQuiz);
router.get('/get', controller.getQuiz);
router.get('/:quizId', controller.getQuizById);

module.exports = router;