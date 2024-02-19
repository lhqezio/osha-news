const express = require('express');

const app = express();

app.use(express.static('../client/build'));
app.use(express.json());

// random article endpoint

// category options endpoint

