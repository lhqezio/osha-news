const express = require('express');
const path = require('node:path'); 

const app = express();

app.use(express.static('../client/build'));
app.use(express.json());


// Article route
const articleRoute = require('./routes/articlesRoute');
app.use('/article', articleRoute);

// Category route
const categoryRoute = require('./routes/categoryRoute');
app.use('/categories', categoryRoute);

// Required to make React Router Dom works correctly
app.get('*', (req, res) => res.sendFile(path.resolve('..', 'client', 'build', 'index.html')));

module.exports = app;
