const express = require('express');
const router = express.Router();

const { login, logout } = require('../controllers/userController');

router.get('/login', login);
router.delete('/logout', logout);

module.exports = router;