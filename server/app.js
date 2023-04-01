const express = require('express');
const cors = require( "cors");
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const boardRouter = require('./routes/boardRoutes');
const columnRouter = require( "./routes/columnRoutes");
// const cardRouter = require( "./routes/cardRoutes");

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/boards', boardRouter);
app.use('/api/columns',columnRouter);
// app.use('/api/cards', cardRouter);

module.exports = app;