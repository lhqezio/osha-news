const express = require('express');
const router = express.Router();

const { getOneArticle } = require('../controllers/articlesControllers');

router.get('/', getOneArticle);

module.exports = router;