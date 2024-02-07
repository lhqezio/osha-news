const DB = require('../db/db');
const fs = require('fs/promises');
const path = require('path');

const db = new DB();


const seeding = async() => {
  try{
    await db.connect('news', 'newsArticles');
    
    const fileData = fs.readFile(path.join(__dirname, '../data/parsedData.json'));

    const jsonData = await JSON.parse(fileData);

  } catch (err) {
    console.error(err);
  } finally {
    db.close();
  }
};