const express = require('express');
const path= require('path')
const helloRoute = require('./routes/helloworldRoute');


const app = express();

const _filename = 
__filename || typeof require !== 'undefined' && require('url').fileURLToPath || '';
const _dirname = __dirname || path.dirname(_filename)

// Add middleware to serve static files
app.use(express.static(path.join(path.dirname(_filename), '..', 
  'client', 'build')));

// Hello world route
app.use('/hello', helloRoute);

app.get('*', (req, res)=>{
  res.sendFile(path.join(path.dirname(_filename), '..', 
    'client', 'build', 'index.html'));
});

app.use((req, res) => {
  res.status(404).json({error: 'Page Not Found'});
});

module.exports = app;