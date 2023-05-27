const express = require('express');
const controller = require('../controllers/quiz');
const router = express.Router();

// localhost:5000/quiz/create
router.post('/create', controller.createQuiz);

module.exports = router;