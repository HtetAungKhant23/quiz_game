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