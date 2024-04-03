const { createManyNewsArticles } = require('../db/db');
const fs = require('fs/promises');
const path = require('path');

const seeding = async () => {
  try{
    console.log('Seeding started.');

    const fileData = await fs.readFile(path.join(__dirname, '../data/parsedData.json'));

    const jsonData = await JSON.parse(fileData);

    const articleData = jsonData.map((article) => {
      let image = '';

      switch(article.category){
      case 'ARTS':
        image = 'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/arts.jpg';
        break;
      case 'ARTS & CULTURE' || 'CULTURE & ARTS':
        image = 
        'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/arts&culture.jpg';
        break;
      case 'BUSINESS':
        image = 
        'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/business.jpg';
        break;
      case 'COLLEGE' || 'EDUCATION':
        image = 
        'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/education.jpg';
        break;
      case 'COMEDY':
        image = 
        'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/comedy.jpg';
        break;
      case 'CRIME':
        image =
        'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/crime.jpg';
        break;
      case 'DIVORCE':
        image =
        'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/divorce.jpg';
        break;
      case 'ENTERTAINMENT':
        image =
        'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/entertainment.jpg';
        break;
      case 'ENVIRONMENT' || 'GREEN':
        image =
        'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/environment.jpg';
        break;
      case 'FOOD & DRINK' || 'TASTE':
        image = 'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/food.jpg';
        break;
      case 'GOOD NEWS':
        image = 'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/good.jpg';
        break;
      case 'HEALTHY LIVING':
        image = 'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/healt.jpg';
        break;
      case 'HOME & LIVING':
        image = 'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/home.jpg';
        break;
      case 'MONEY':
        image = 'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/money.jpg';
        break;
      case 'PARENTING' || 'PARENTS':
        image = 
        'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/parenting.jpg';
        break;
      case 'POLITICS':
        image = 
        'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/politics.jpg';
        break;
      case 'RELIGION':
        image = 
        'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/religion.jpg';
        break;
      case 'SCIENCE':
        image = 
        'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/science.jpg';
        break;
      case 'SPORTS':
        image = 
        'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/sports.jpg';
        break;
      case 'STYLE' || 'STYLE & BEAUTY':
        image = 'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/style.jpg';
        break;
      case 'TECH':
        image = 'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/tech.jpg';
        break;
      case 'TRAVEL':
        image =
        'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/travel.jpg';
        break;
      case 'WEDDINGS':
        image = 
        'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/weddings.jpg';
        break;
      case 'WORLD NEWS':
        image = 
        'https://azuretest2142443.blob.core.windows.net/helloblob/category-image/world.jpg';
        break;
      default:
        image =
        'https://azuretest2142443.blob.core.windows.net/helloblob/news%20image.webp';
        break;
      }

      return {
        'link': article.link,
        'headline': article.headline,
        'category': article.category,
        'text': article.short_description,
        'authors': article.authors,
        'date': article.date,
        'image': image,
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
