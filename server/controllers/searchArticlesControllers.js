const { getSearchedArticles } = require('../db/db');

/**
 * Search method that searches through articles through different methods
 * @param req request made by api
 * @param res response sent by api
 * @param req.query.searchtype type of search by user
 * @param req.query.searchvalue value of search used in query
 * @param req.query.page page of values (pagination)
 */
module.exports.searchAllArticles = async (req, res) => {
  try{
    const searchType = req.query.searchtype;
    const searchValue = req.query.searchvalue;
    const pageNum = req.query.page;

    if (!searchType) {
      res.status(400).json({ 'error' : 'Missing search type parameter' });
      return;
    }
    if (!searchValue) {
      res.status(400).json({ 'error' : 'Missing value parameter' });
      return;
    }

    // set base page to 1
    let page = 1;

    // attempt to parse page num to int, will default to 1 if value is NaN or <=0
    if (pageNum){
      const temp = parseInt(pageNum, 10);
      if (temp > 0) {
        page = temp;
      }
    }

    let results;

    // create case insensitive regex search
    const regex = new RegExp(searchValue, 'i');

    switch(searchType){
    case 'category':
      // search by category exact value
      results = await getSearchedArticles({ category : { $in : [searchValue] } }, page);
      break;
    case 'headline':
      // search by keyword in headline
      results = await getSearchedArticles({ headline : { $regex : regex } }, page);
      break;
    default:
      results = 'no matches';
    }
    
    // returns values found if more than 1 value exists
    res.status(200).json(
      { 'search method' : searchType, 'search value' : searchValue, 'result' : results }
    );
  } catch (err) {
    res.status(500).json({ 'error' : 'Internal Error' });
  }
};