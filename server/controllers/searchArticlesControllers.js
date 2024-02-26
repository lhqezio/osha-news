const DB = require('../db/db');
const db = new DB();

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

    if(searchType === 'category'){
      // search by category exact value
      results = await db.getSearchedArticles({ category : { $in : [searchValue]}}, page);
    } 
    if (searchType === 'headline') {
      // create case insensitive regex search
      const regex = new RegExp(searchValue, 'i');
      // search by keyword in headline
      results = await db.getSearchedArticles({ headline : { $regex : regex }}, page);
    }

    if (results[0].data.length === 0) {
      // if no values found, it will return no matches, not an error
      res.status(200).json({'search method' : searchType, 'result' : 'No matches' });
    } else {
      // returns values found if more than 1 value exists
      res.status(200).json({'search method' : searchType, 'result' : results });
    }
  } catch (err) {
    res.status(500).json({ 'error' : 'Internal Error' });
  }
};