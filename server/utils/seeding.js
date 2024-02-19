const DB = require('../db/db');
const fs = require('fs/promises');
const path = require('path');

const db = new DB();

const seeding = async() => {
  try{
    console.log('Seeding started.');

    await db.connect('news');

    const fileData = await fs.readFile(path.join(__dirname, '../data/parsedData.json'));

    const jsonData = await JSON.parse(fileData);

    await db.createManyNewsArticles(jsonData);
    
    console.log(`Inserted records in newsArticles.`);
  } catch (err) {
    console.error(err);
  } finally {
    db.close();
  }
};

seeding();
