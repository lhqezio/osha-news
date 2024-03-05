const { getCategories } = require('../db/db');

module.exports.getAllCategories = async (req, res) => {
  try{
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (_) {
    res.status(500).json({'error': 'Internal Error.'});
  }
};