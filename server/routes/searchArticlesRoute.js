const express = require('express');
const router = express.Router();

const { searchAllArticles } = require('../controllers/searchArticlesControllers');

router.get('/', searchAllArticles);

module.exports = router;