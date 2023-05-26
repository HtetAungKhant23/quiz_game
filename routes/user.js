const express = require('express');
const controller = require('../controllers/user');
const router = express.Router();

// localhost:5000/user/post
router.post('/post', controller.createUser);

// localhost:5000/user/:id
router.patch('/:id', controller.updateUser);

// localhost:5000/user/next/:id
router.post('/next/:id', controller.nextRound);

// localhost:5000/user/getquiz
router.get('/getquiz', controller.getQuiz);

module.exports = router;