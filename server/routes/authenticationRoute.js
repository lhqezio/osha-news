const express = require('express');
const router = express.Router();

const { authenticateGoogle } = require('../controllers/authenticationController');

router.post('/google', authenticateGoogle);

module.exports = router;