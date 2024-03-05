const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const key = process.env.AZURE_TRANSLATE_KEY;
const endpoint = 'https://api.cognitive.microsofttranslator.com';
const location = 'canadacentral';

/**
 * Translate text to desired language using Azure API
 * @param {String} text to translate
 * @param {String} to target language eg. fr, es
 * @param {String} from original language (defaults to 'en')
 * @returns Object { text: 'translated text', to: 'language tranlated to' }
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
  return res.data[0].translations[0];
};

/**
 * Translate text to desired language using Azure API
 * @param {Object} article article object to translate
 * @param {String} to target language eg. fr, es
 * @param {String} from original language (defaults to 'en')
 * @returns translated article
 */
module.exports.translateOneArticle = async (article, to, from = 'en') => {
  const headline = await this.translate(article.headline, to, from);
  const category = await this.translate(article.category, to, from);
  const text = await this.translate(article.text, to, from);
  return {
    _id: article._id,
    link: article.link,
    headline: headline.text,
    category: category.text,
    text: text.text,
    author: article.author,
    date: article.date,
    image: article.image,
    __v: article.__v,
  };
};

/**
 * Translate text to desired language using Azure API
 * @param {Array} articles article object to translate
 * @param {String} to target language eg. fr, es
 * @param {String} from original language (defaults to 'en')
 * @returns translated article
 */
module.exports.translateMultipleArticle = async (articles, to, from = 'en') => {
  const newArticles = await Promise.all(articles.map(async (article) => {
    return await this.translateOneArticle(article, to, from);
  }));
  return newArticles;
};