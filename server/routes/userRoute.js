const express = require('express');
const router = express.Router();

const { getUserInfo, logout, searchUsers } = require('../controllers/userController');

router.get('/user-info', getUserInfo);
router.delete('/logout', logout);
router.get('/search', searchUsers);

module.exports = router;