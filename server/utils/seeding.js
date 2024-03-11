const { createManyNewsArticles } = require('../db/db');
const fs = require('fs/promises');
const path = require('path');

const seeding = async () => {
  try{
    console.log('Seeding started.');

    const fileData = await fs.readFile(path.join(__dirname, '../data/parsedData.json'));

    const jsonData = await JSON.parse(fileData);

    const articleData = jsonData.map((article) => {
      return {
        'link': article.link,
        'headline': article.headline,
        'category': article.category,
        'text': article.short_description,
        'authors': article.authors,
        'date': article.date,
        'image': 'https://azuretest2142443.blob.core.windows.net/helloblob/news%20image.webp',
        'lang': 'en'
      };
    });

    await createManyNewsArticles(articleData);
    
    console.log(`Inserted records in newsArticles.`);
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

(async () => await seeding())();
