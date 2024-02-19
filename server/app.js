const express = require('express');

const app = express();

app.use(express.static('../client/build'));
app.use(express.json());

const categoryRoute = require('./routes/categoryRoute');
app.use('/categories', categoryRoute);

module.exports = app;
