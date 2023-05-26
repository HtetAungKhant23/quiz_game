const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },

    complete_quiz: {
        // OneQuiz db nae ref lout chin ll ya ml
        count: {
            type: Number,
            default: 0
        },
        point: {
            type: Number,
            default: 0
        }
    },

    totalPrice: {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('User', userSchema);