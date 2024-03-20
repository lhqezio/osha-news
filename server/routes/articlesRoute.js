const express = require('express');
const router = express.Router();

const { 
  getOneArticle, 
  getRandomArticle, 
  searchAllArticles,
  addArticle
} = require('../controllers/articlesControllers');

router.get('/', getOneArticle);

router.get('/random', getRandomArticle);
router.post('/random', getRandomArticle);

router.get('/search', searchAllArticles);
router.post('/search', searchAllArticles);

router.post('/add', addArticle);

module.exports = router;