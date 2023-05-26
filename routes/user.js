const express = require('express');
const controller = require('../controllers/user');
const router = express.Router();

router.post('/post', controller.postUser);
router.put('/:id', controller.);

module.exports = router;