const { getOneArticle, getRandomArticle, getSearchedArticles } = require('../db/db');

/**
 * Express Controller
 * Get the first article from db
 * @param req request made to the api
 * @param res responce send by the api
 */
module.exports.getOneArticle = async (req, res) => {
  try {
    const article = await getOneArticle();

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

    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({'error': 'Internal Error.'});
  }
};

/**
 * Search method that searches through articles through different methods
 * @param req request made by api
 * @param res response sent by api
 * @param req.query.searchtype type of search by user
 * @param req.query.searchvalue value of search used in query
 * @param req.query.page page of values (pagination)
 */
module.exports.searchAllArticles = async (req, res) => {
  try{
    const category = req.param.category;
    const search = req.param.search ? req.param.search : req.query.search;
    const page = req.param.page !== null ? req.param.page : req.query.page;
    const amount = req.param.amount !== null ? req.param.amount : req.query.amount;

    if (!(search || category)) {
      res.status(400).json({ 'error' : 'missing search value' });
      return;
    }

    // set base page to 1
    let pageBase = 1;
    let amountBase = 10;

    // attempt to parse page num to int, will default to 1 if value is NaN or <=0
    if (page){
      const temp = parseInt(page, 10);
      if (temp > 0) {
        pageBase = temp;
      }
    }
    
    if (amount){
      const temp = parseInt(amount, 10);
      if (temp > 0) {
        amountBase = temp;
      }
    }

    // create case insensitive regex search
    const regex = new RegExp(search, 'i');

    // let categoryFilter = {};

    // if (category !== null || category.length > 0) {
    //   categoryFilter = category;
    // }

    const results = await getSearchedArticles(regex, pageBase, amountBase);
    
    // returns values found if more than 1 value exists
    res.status(200).json(
      { 'search value' : search, 'result' : results }
    );
  } catch (err) {
    res.status(500).json({ 'error' : 'Internal Error' });
  }
};