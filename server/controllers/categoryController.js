const DB = require('../db/db');

const db = DB();

module.exports.getAllCategories = async (res) => {
  const categories = await db.getAllCategories();
  res.send(categories);
};