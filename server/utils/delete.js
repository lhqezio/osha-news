/* eslint-disable no-console */
const {emptyDatabase} = require('../db/db');

const clearDatabase = async () => {
  try {
    console.log('Deleting started.');

    const amount = await emptyDatabase();
    
    console.log(`Deleted ${amount} records`);
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

(async () => clearDatabase())();
