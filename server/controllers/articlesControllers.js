const DB = require('../db/db');

const db = new DB();

module.exports.getOneArticle = async (req, res) => {
  try {
    const article = await db.getOneArticle();

    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({'error': 'Internal Error.'});
  }
};