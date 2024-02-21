const DB = require('../db/db');

const db = new DB();

module.exports.getAllCategories = async (req, res) => {
  try{
    const categories = await db.getCategories();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({'error': 'Internal Error'});
  }
};