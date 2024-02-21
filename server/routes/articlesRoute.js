const express = require('express');
const router = express.Router();

const { getOneArticle, getRandomArticle } = require('../controllers/articlesControllers');

router.get('/', getOneArticle);
router.get('/random', getRandomArticle);

module.exports = router;