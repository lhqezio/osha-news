const express = require('express');

const app = express();

app.use(express.static('../client/build'));
app.use(express.json());

// Article route
const articleRoute = require('./routes/articlesRoute');
app.use('/article', articleRoute);

// Category route
const categoryRoute = require('./routes/categoryRoute');
app.use('/categories', categoryRoute);

module.exports = app;
