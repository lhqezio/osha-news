const express = require('express');

const app = express();

app.use(express.json());

// Hello world route
const helloRoute = require('./routes/helloworldRoute');
app.use('/hello', helloRoute);

// Users route
const usersCommentsRoute = require('./routes/userCommentRoute');
app.use('/user-comment', usersCommentsRoute);

const usersImagesRoute = require('./routes/userImageRoute');
app.use('/user-image', usersImagesRoute);

app.get('/', (req, res) => {
  res.send('Server ON');
});

app.use((req, res) => {
  res.status(404).json({error: 'Page Not Found'});
});

module.exports = app;