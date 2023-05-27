const express = require('express');
const controller = require('../controllers/user');
const router = express.Router();

// localhost:5000/user/getquiz
router.get('/getquiz', controller.getQuiz);

// localhost:5000/user/create
router.post('/create', controller.createUser);

// localhost:5000/user/:id
router.patch('/:id', controller.updateUser);

module.exports = router;