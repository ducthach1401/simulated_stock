const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const User = require('./src/route/route.js');
const cors = require('cors');   
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use('/user', User);

app.listen(8080, () => {
    console.log("Run Server http://localhost:8080");
})