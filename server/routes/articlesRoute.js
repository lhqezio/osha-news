const express = require('express');
const router = express.Router();

const { 
  getOneArticle, 
  getRandomArticle, 
  searchAllArticles,
  translateArticles,
  addArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articlesControllers');

router.get('/', getOneArticle);

router.get('/random', getRandomArticle);
router.post('/random', getRandomArticle);

router.get('/search', searchAllArticles);
router.post('/search', searchAllArticles);

router.post('/translate', translateArticles);
router.post('/add', addArticle);

router.put('/update', updateArticle);

router.post('/delete', deleteArticle);

module.exports = router;