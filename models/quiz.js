const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    lvl_1: {
        que_list: [{
            quiz: {
                type: String,
                required: true
            },
            ans: [{
                type: String
            }]
        }],
        price: {
            type: Number,
            default: 1000
        }
    },

    lvl_2: {
        que_list: [{
            quiz: {
                type: String,
                required: true
            },
            ans: [{
                type: String
            }]
        }]
        ,
        price: {
            type: Number,
            default: 2000
        }
    },

    lvl_3: {
        que_list: [{
            quiz: {
                type: String,
                required: true
            },
            ans: [{
                type: String
            }]
        }]
        ,
        price: {
            type: Number,
            default: 3000
        }
    }
});
module.exports = mongoose.model('Quiz', quizSchema);