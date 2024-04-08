const express = require('express');
const router = express.Router();

const { 
  getOneArticle, 
  getRandomArticle, 
  searchAllArticles,
  translateArticles,
  getOneArticleById,
  addArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articlesControllers');

router.get('/', getOneArticle);
router.get('/id', getOneArticleById);

router.get('/random', getRandomArticle);
router.post('/random', getRandomArticle);

router.get('/search', searchAllArticles);
router.post('/search', searchAllArticles);

router.post('/translate', translateArticles);
router.post('/add', addArticle);

router.put('/update', updateArticle);

router.delete('/delete', deleteArticle);

module.exports = router;