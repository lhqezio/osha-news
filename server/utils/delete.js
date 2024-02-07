/* eslint-disable no-console */
const DB = require('../db/db');

const clearDatabase = async () => {
  let db;
  try {
    console.log('Deleting started.');
    db = new DB();
    await db.connect('news', 'newsArticles');

    const amount = await db.deleteManyArticles({});
    
    console.log(`Deleted ${amount} records form newsArticles.`);
  } catch (err) {
    console.error(err);
  } finally {
    db.close();
  }
  process.exit();
};

(async () => clearDatabase())();