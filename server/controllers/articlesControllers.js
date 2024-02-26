const {getOneArticle} = require('../db/db');

module.exports.getOneArticle = async (req, res) => {
  try {
    const article = await getOneArticle();

    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({'error': 'Internal Error.'});
  }
};