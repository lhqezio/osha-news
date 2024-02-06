const express = require('express');

const app = express();

// Hello world route
const helloRoute = require('./routes/helloworldRoute');
app.use('/hello', helloRoute);

app.get('/', (req, res) => {
  res.send('Server ON');
});

app.use((req, res) => {
  res.status(404).json({error: 'Page Not Found'});
});

module.exports = app;