const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const key = process.env.AZURE_TRANSLATE_KEY;
const endpoint = 'https://api.cognitive.microsofttranslator.com';
const location = 'canadacentral';

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