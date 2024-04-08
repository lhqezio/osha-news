const express = require('express');
const router = express.Router();

const { getUserInfo, logout, searchUsers, getUserPosts } = require('../controllers/userController');

router.get('/user-info', getUserInfo);
router.delete('/logout', logout);
router.get('/search', searchUsers);
router.get('/user-posts', getUserPosts);

module.exports = router;