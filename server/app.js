const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

app.use(express.static('../client/build'));
app.use(express.json());

//for accepting files through requests
const fileUpload = require('express-fileupload');
app.use(
  fileUpload({
    createParentPath: true,
  })
);
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

// Image route
const imageRoute = require('./routes/imageRoute');
app.use('/api/image', imageRoute);

// Comment route
const commentRoute = require('./routes/commentRoute');
app.use('/api/comment', commentRoute);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('/build', 'index.html'));
});

module.exports = app;
