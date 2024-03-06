const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('../client/build'));
app.use(express.json());

// Article route
const articleRoute = require('./routes/articlesRoute');
app.use('/article', articleRoute);

// Category route
const categoryRoute = require('./routes/categoryRoute');
app.use('/categories', categoryRoute);

// User route
const userRoute = require('./routes/userRoute');
app.use('/users', userRoute);

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;
