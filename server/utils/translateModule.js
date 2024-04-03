const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
// eslint-disable-next-line no-unused-vars
const Article = require('../classes/Article');
require('dotenv').config();

const key = process.env.AZURE_TRANSLATE_KEY;
const endpoint = 'https://api.cognitive.microsofttranslator.com';
const location = 'canadacentral';

/**
 * Translate text to desired language using Azure API
 * @param {String} text To translate
 * @param {String} to Target language eg. fr, es
 * @param {String} from Original language (defaults to 'en')
 * @returns {String} Translated text
 */
module.exports.translate = async (text, to, from = 'en') => {
  const res = await axios({
    baseURL: endpoint,
    url: '/translate',
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Ocp-Apim-Subscription-Region': location,
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    },
    params: {
      'api-version': '3.0',
      'from': from,
      'to': to
    },
    data: [{
      'text': text
    }],
    responseType: 'json'
  });
  return res.data[0].translations[0].text;
};

/**
 * Translate article to desired language using Azure API
 * @param {Object} article Article object to translate
 * @param {String} to Target language eg. fr, es
 * @param {String} from Original language (defaults to 'en')
 * @returns {Object} Translated article
 */
module.exports.translateOneArticle = async (article, to, from = 'en') => {
  const textReq = [article.headline, article.category, article.text];
  const textRes = await Promise.all(textReq.map(async (text) => {
    return await this.translate(text, to, from);
  }));
  
  return {
    _id: article._id,
    link: article.link,
    headline: textRes[0],
    category: textRes[1],
    text: textRes[2],
    author: article.authors,
    date: article.date,
    image: article.image,
    lang: to,
    __v: article.__v,
  };
};

/**
 * Translate articles to desired language using Azure API
 * @param {Array} articles Array of articles object to translate
 * @param {String} to Target language eg. fr, es
 * @param {String} from Original language (defaults to 'en')
 * @returns {Object} Translated articles
 */
module.exports.translateMultipleArticle = async (articles, to, from = 'en') => {
  const newArticles = await Promise.all(articles.map(async (article) => {
    return await this.translateOneArticle(article, to, from);
  }));
  return newArticles;
};

/**
 * Translate categories to desired language using Azure API
 * @param {Array} categories Categories to translate
 * @param {String} to Target language eg. fr, es
 * @param {String} from Original language (defaults to 'en')
 * @returns {Object} Translated categories
 */
module.exports.translateCategories = async (categories, to, from = 'en') => {
  const newCategories = await Promise.all(categories.map(async (category) => {
    return await this.translate(category, to, from);
  }));
  return newCategories;
};