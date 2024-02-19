const DB = require('../db/db');

const db = new DB();

module.exports.getAllCategories = async (req, res) => {
  const categories = await db.getCategories();
  res.send(categories);
};