const DB = require('../db/db');

const db = new DB();

/**
 * Express Controller
 * Get the first article from db
 * @param req request made to the api
 * @param res responce send by the api
 */
module.exports.getOneArticle = async (req, res) => {
  try {
    const article = await db.getOneArticle();

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
 */
module.exports.getRandomArticle = async (req, res) => {
  try {
    const filter = {};
    let amount = 1;

    if (req.query.amount) {
      const temp = parseInt(req.query.amount);
      if (temp > 0) {
        amount = temp;
      }
    }

    const articles = await db.getRandomArticle(
      filter,
      amount
    );

    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({'error': 'Internal Error.'});
  }
};