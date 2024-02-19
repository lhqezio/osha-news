const express = require('express');

const app = express();

app.use(express.static('../client/build'));
app.use(express.json());

<<<<<<< HEAD
// random article endpoint

// category options endpoint

=======
module.exports = app;
>>>>>>> 601704881fc1da315a80fde21fbf3c2b1b8f3553
