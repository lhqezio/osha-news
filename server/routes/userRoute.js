const express = require('express');
const router = express.Router();

const { getUserInfo, logout, searchUsers, 
  getUserPosts, addUserDescription } = require('../controllers/userController');

router.get('/user-info', getUserInfo);
router.delete('/logout', logout);
router.get('/search', searchUsers);
router.get('/user-posts', getUserPosts);
router.post('/description', addUserDescription);

module.exports = router;