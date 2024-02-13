const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
  })
);

const _filename = 
__filename || typeof require !== 'undefined' && require('url').fileURLToPath || '';
// const _dirname = __dirname || path.dirname(_filename);

// Add middleware to serve static files
app.use(express.static(path.join(path.dirname(_filename), '..', 
  'client', 'build')));

// Hello world route
const helloRoute = require('./routes/helloworldRoute');
app.use('/hello', helloRoute);

// Users route
const usersCommentsRoute = require('./routes/userCommentRoute');
app.use('/user-comment', usersCommentsRoute);

const usersImagesRoute = require('./routes/userImageRoute');
app.use('/user-images', usersImagesRoute);

app.get('/', (req, res) => {
  res.send('Server ON');
});

app.use((req, res) => {
  res.status(404).json({error: 'Page Not Found'});
});

module.exports = app;