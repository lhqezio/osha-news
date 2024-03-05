const { getOneArticle, getRandomArticle, getSearchedArticles } = require('../db/db');
const { translateOneArticle, translateMultipleArticle } = require('../utils/translateModule');

/**
 * Express Controller
 * Get the first article from db
 * @param req request made to the api
 * @param res responce send by the api
 */
module.exports.getOneArticle = async (req, res) => {
  try {
    const article = await getOneArticle();

    if (req.query.lang) {
      const newArticle = await translateOneArticle(article, req.query.lang);
      res.status(200).json(newArticle);
      return;
    }

    res.status(200).json(article);
  } catch (err) {
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

    if (req.query.lang) {
      const newArticle = await translateMultipleArticle(articles, req.query.lang);
      res.status(200).json(newArticle);
      return;
    }

    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({'error': 'Internal Error.'});
  }
};

/**
 * Search method that searches through articles through different methods
 * @param req Request made by api
 * @param res Response sent by api
 * @param req.param.category List of category
 * @param req.param.search Search query
 * @param req.query.search Search query
 * @param req.param.page Page number
 * @param req.query.page Page number
 * @param req.param.amount Amount of article in one page
 * @param req.query.amount Amount of article in one page
 */
module.exports.searchAllArticles = async (req, res) => {
  try{
    // Get all values from param first and then from query if it doesnt exist
    const category = req.body.category;
    const search = req.param.search ? req.param.search : req.query.search;
    const page = req.param.page ? req.param.page : req.query.page;
    const amount = req.param.amount ? req.param.amount : req.query.amount;

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
    
    // returns values found if more than 1 value exists
    res.status(200).json(
      { 'search' : search, 'result' : parsedResults }
    );
  } catch (err) {
    res.status(500).json({ 'error' : 'Internal Error' });
  }
};