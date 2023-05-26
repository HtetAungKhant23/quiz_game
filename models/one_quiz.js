const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizUserSchema = new Schema({

    question: {
        type: String
    },

    answer: [{
        type: String
    }]

});

module.exports = mongoose.model('OneQuiz', quizUserSchema);