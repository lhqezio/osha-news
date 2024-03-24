const express = require('express');
const router = express.Router();

const { login, logout, searchUsers } = require('../controllers/userController');

router.get('/login', login);
router.delete('/logout', logout);
router.get('/search', searchUsers);

module.exports = router;