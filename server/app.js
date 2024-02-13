const express = require('express');
const path = require('path');
const helloRoute = require('./routes/helloworldRoute');


const app = express();

const _filename = 
__filename || typeof require !== 'undefined' && require('url').fileURLToPath || '';

// Add middleware to serve static files

const fileUpload = require('express-fileupload');

app.use(express.json());
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// Hello world route
app.use('/hello', helloRoute);

// Users route
const usersCommentsRoute = require('./routes/userCommentRoute');
app.use('/user-comment', usersCommentsRoute);

const usersImagesRoute = require('./routes/userImageRoute');
app.use('/user-images', usersImagesRoute);

app.use(express.static(path.join(path.dirname(_filename), '..', 
  'client', 'build')));

app.get('*', (req, res)=>{
  res.sendFile(path.join(path.dirname(_filename), '..', 
    'client', 'build', 'index.html'));
});


module.exports = app;