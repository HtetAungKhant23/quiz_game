const express = require('express');
const controller = require('../controllers/user');
const router = express.Router();

router.post('/post', controller.createUser);

router.patch('/:id', controller.updateUser);

router.post('/next/:id', controller.nextRound);

router.get('/getquiz', controller.getQuiz);

module.exports = router;