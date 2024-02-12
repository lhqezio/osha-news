const express = require('express');
const router = express.Router();

const { getUserImages, addUserImage } = require('../controllers/userImageController');

router.get('/', getUserImages);

router.post('/', addUserImage);

module.exports = router;