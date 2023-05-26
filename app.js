const express = require('express');
const mongoose = require('mongoose');
const quizRouter = require('./routes/quiz');
const userRouter = require('./routes/user');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/quiz', quizRouter);
app.use('/user', userRouter);

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(result => {
    console.log('Connected DB');
    app.listen(process.env.PORT, () => {
        console.log('server running at ', process.env.PORT);
    });
})
.catch(err => {
    console.log('there is mongo error!');
    console.log(err);
})


















// mongoose.connect(
//         'mongodb+srv://root:root@cluster0.ksor6cg.mongodb.net/Quiz?retryWrites=true&w=majority',
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }
//     )
//     .then(result => {
//         console.log('connected DB!');
//         app.listen(5000);
//     })
//     .catch(err => {
//         console.log(err);
//     })
// console.log(process.env.MONGO_URL)

