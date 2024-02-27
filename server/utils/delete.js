/* eslint-disable no-console */
const DB = require('../db/db');

const clearDatabase = async () => {
  let db;
  try {
    console.log('Deleting started.');
    db = new DB();
    await db.connect('news');

    const amount = await db.deleteMany({});
    
    console.log(`Deleted ${amount} records`);
  } catch (err) {
    console.error(err);
  } finally {
    db.close();
  }
  process.exit();
};

(async () => clearDatabase())();
