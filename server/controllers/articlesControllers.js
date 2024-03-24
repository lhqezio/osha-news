const Article = require('../classes/Article');
const { 
  getOneArticle, 
  getRandomArticle, 
  getSearchedArticles,
  createNewsArticle
} = require('../db/db');
const { 
  translateOneArticle, 
  translateMultipleArticle 
} = require('../utils/translateModule');

/**
 * Express Controller
 * Get the first article from db
 * @param req request made to the api
 * @param res responce send by the api
 */
module.exports.getOneArticle = async (req, res) => {
  try {
    const article = await getOneArticle();

    if (req.query.lang && req.query.lang !== 'en') {
      try {
        const newArticle = await translateOneArticle(article, req.query.lang);
        res.status(200).json(newArticle);
      } catch (_) {
        res.status(200).json(article);
      }
      return;
    }

    res.status(200).json(article);
  } catch (_) {
    res.status(500).json({'error': 'Internal Error.'});
  }
};

/**
 * Express Controller
 * Get a random article from db
 * @param req request made to the api
 * @param res responce send by the api
 * @param req.query.amount set the amount of random article
 * @param req.param.filter list of viewed article by _id
 */
module.exports.getRandomArticle = async (req, res) => {
  try {
    let filter = {};
    let amount = 1;

    if (req.query.amount) {
      const temp = parseInt(req.query.amount);
      if (temp > 0) {
        amount = temp;
      }
    }

    if (req.param.filter && req.param.filter.length) {
      filter = {
        _id:{
          $elemMatch: {
            $nin: req.param.filter
          }
        }
      };
    }

    const articles = await getRandomArticle(
      filter,
      amount
    );

    if (req.query.lang && req.query.lang !== 'en') {
      try {
        const newArticle = await translateMultipleArticle(articles, req.query.lang);
        res.status(200).json(newArticle);
      } catch (_) {
        res.status(200).json(articles);
      }
      return;
    }

    res.status(200).json(articles);
  } catch (_) {
    res.status(500).json({'error': 'Internal Error.'});
  }
};

/**
 * Search method that searches through articles through different methods
 * @param req Request made by api
 * @param res Response sent by api
 * @param req.body.category List of category
 * @param req.body.search Search query
 * @param req.query.search Search query
 * @param req.body.page Page number
 * @param req.query.page Page number
 * @param req.body.amount Amount of article in one page
 * @param req.query.amount Amount of article in one page
 */
module.exports.searchAllArticles = async (req, res) => {
  try{
    // Get all values from param first and then from query if it doesnt exist
    const category = req.body.category;
    const search = req.body.search ? req.body.search : req.query.search;
    const page = req.body.page ? req.body.page : req.query.page;
    const amount = req.body.amount ? req.body.amount : req.query.amount;

    // Make sure that one of search or category is present
    if (!(search || category)) {
      res.status(400).json({ 'error' : 'missing search value' });
      return;
    }

    // Sets category if defined
    let categoryFilter = null;

    if (category !== null || category.length > 0) {
      categoryFilter = category;
    }

    // set base page to 1 and amount to 10
    let pageBase = 1;
    let amountBase = 10;

    // Attempt to parse page num to int, will default to 1 if value is NaN or <=0
    if (page){
      const temp = parseInt(page);
      if (temp > 0) {
        pageBase = temp;
      }
    }
    
    // Attempt to parse amount num to int, will default to 10 if value is NaN or <=0
    if (amount){
      const temp = parseInt(amount);
      if (temp > 0) {
        amountBase = temp;
      }
    }

    // create case insensitive regex search
    let regex;
    if (search === undefined){
      regex = new RegExp('[\\s\\S]*');
    }else{
      regex = new RegExp(search, 'i');
    }
    
    const results = await getSearchedArticles(regex, categoryFilter, pageBase, amountBase);
    const parsedResults = results[0].data;

    if (req.query.lang && req.query.lang !== 'en') {
      try {
        const newResult = await translateMultipleArticle(parsedResults, req.query.lang);
        res.status(200).json(
          { 'search' : search, 'result' : newResult }
        );
      } catch (_) {
        res.status(200).json(
          { 'search' : search, 'result' : parsedResults }
        );
      }
      return;
    }
    
    // returns values found if more than 1 value exists
    res.status(200).json(
      { 'search' : search, 'result' : parsedResults }
    );
  } catch (_) {
    res.status(500).json({ 'error' : 'Internal Error' });
  }
};

/**
 * Translate a list of articles
 * @param req Request made by api
 * @param res Response sent by api
 * @param req.body.articles List of articles to translate
 * @param req.query.lang Language to translate to 
 */
module.exports.translateArticles = async (req, res) => {
  const lang = req.query.lang;
  if (!lang) {
    res.status(400).json({'error': 'No language provided.'});
    return;
  }
  
  const articles = req.body.articles;
  if (!articles) {
    res.status(400).json({'error': 'Did not provide a list of articles.'});
    return;
  }
  // TODO: ADD check to check if req.body.articles are article

  try {
    const translatedArticles = await translateMultipleArticle(articles, lang);
    res.status(200).json({articles: translatedArticles});
  } catch (_) {
    res.status(500).json({'error': 'Internal Error.'});
  }
};

/**
 * Insert One article to the database
 * @param {*} req Request made by api
 * @param {*} res Response made by api
 * @param {Article} req.body.article Article to insert
 */
module.exports.addArticle = async (req, res) => {
  try {
    const article = new Article(
      null,
      req.body.link,
      req.body.headline,
      req.body.category,
      req.body.text,
      req.body.authors,
      req.body.date,
      req.body.image
    );
    if (article) {
      try {
        const newArticle = await createNewsArticle(article.getArticleNoId());
        res.status(201).json({
          'status': 'Added article',
          'article': newArticle
        });
      } catch (_) {
        res.status(500).json({'error' : 'Internal Error'});
      }
    } else {
      res.status(400).json({'error': 'No article provided in body'});
    }
  } catch (err) {
    res.status(400).json({
      'error': 'Article does not follow the right format.',
      'message': err.message
    });
  }
};