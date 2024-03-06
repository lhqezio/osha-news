const { getCategories } = require('../db/db');
const { translateCategories } = require('../utils/translateModule');

module.exports.getAllCategories = async (req, res) => {
  try{
    const categories = await getCategories();

    if (req.query.lang && req.query.lang !== 'en') {
      try {
        const newCategories = await translateCategories(categories, req.query.lang);
        res.status(200).json(newCategories);
      } catch (_) {
        res.status(200).json(categories);
      }
      return;
    }

    res.status(200).json(categories);
  } catch (_) {
    res.status(500).json({'error': 'Internal Error.'});
  }
};