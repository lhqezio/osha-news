const express = require('express');
const router = express.Router();
// const DB = require('../db/db');

const { getHelloWorld } = require('../controllers/helloworldController');
router.get('/', getHelloWorld);

module.exports = router;