const express = require('express');

const app = express();

app.use(express.json());

// Hello world route
const helloRoute = require('./routes/helloworldRoute');
app.use('/hello', helloRoute);

// Users route
const usersRoute = require('./routes/userCommentRoute');
app.use('/user-comment', usersRoute);

app.get('/', (req, res) => {
  res.send('Server ON');
});

app.use((req, res) => {
  res.status(404).json({error: 'Page Not Found'});
});

module.exports = app;