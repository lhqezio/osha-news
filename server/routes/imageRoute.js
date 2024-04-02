const express = require('express');
const router = express.Router();

const { addImage } = require('../controllers/imageController');

router.post('/', addImage);

module.exports = router;
