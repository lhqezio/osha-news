const express = require('express');
const router = express.Router();

const { getUserComments, addUserComment } = require('../controllers/userCommentController');

router.get('/', getUserComments);

router.post('/', addUserComment);

module.exports = router;