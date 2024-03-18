const express = require('express');
const router = express.Router();

const { authenticateGoogle, authenticate } = require('../controllers/authenticationController');

router.post('/google', authenticateGoogle);
router.post('/', authenticate);

module.exports = router;