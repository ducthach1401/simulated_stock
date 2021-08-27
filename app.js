const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const User = require('./src/route/route');
const View = require('./src/view/route/view');
const UserUSA = require('./src/route/route.stock');

const cors = require('cors');   
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(__dirname + '/src/view/'));
app.use('/user', User);
app.use('/userUSA', UserUSA)
app.use('/', View);
app.listen(port, () => {
    console.log("Run Server http://localhost:8080");
})