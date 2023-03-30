const express = require('express');
const cors = require( "cors");
// const morgan = require('morgan');
const bodyParser = require('body-parser')

const userRouter = require('./routes/userRoutes');


const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.use('/api/users', userRouter);

module.exports = app;