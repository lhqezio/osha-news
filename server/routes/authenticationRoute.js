const express = require('express');
const router = express.Router();

const { authenticate } = require('../controllers/authenticationController');

router.post('/', authenticate);

module.exports = router;