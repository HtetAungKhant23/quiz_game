const express = require('express');
const { body } = require('express-validator');
const controller = require('../controllers/user');
const router = express.Router();
const User = require('../models/user');

// localhost:5000/user/create
router.post('/create', controller.createUser);

// localhost:5000/user/getquiz/?level=medium
router.get('/getquiz', controller.getQuiz);

// localhost:5000/user/:id
router.patch('/:id', controller.updateUser);

module.exports = router;