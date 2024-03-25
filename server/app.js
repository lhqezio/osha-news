const express = require('express');
// const path = require('path');
const session = require('express-session');

const app = express();

app.use(express.static('../client/build'));
app.use(express.json());
app.use(session({secret: 'secretfornow'}));

// Article route
const articleRoute = require('./routes/articlesRoute');
app.use('/api/article', articleRoute);

// Category route
const categoryRoute = require('./routes/categoryRoute');
app.use('/api/categories', categoryRoute);

// User route
const authenticateRoute = require('./routes/authenticationRoute');
app.use('/api/authenticate', authenticateRoute);

// User route
const userRoute = require('./routes/userRoute');
app.use('/api/users', userRoute);

// Required to make React Router Dom works correctly
// app.get('*', (req, res) => res.sendFile(path.resolve('..', 'client', 'build', 'index.html')));

module.exports = app;
