const express = require('express');
const router = express.Router();

const { searchAllArticles } = require('../controllers/searchArticlesControllers');

router.get('/:searchType-:searchValue', searchAllArticles);

module.exports = router;