const DB = require('../db/db');
const db = new DB();

module.exports.searchAllArticles = async (req, res) => {
  try{
    const searchType = req.query.searchtype;
    const searchValue = req.query.searchvalue;
    const pageNum = req.query.page;

    let page = 1;

    try {
      page = parseInt(pageNum, 10);
    } catch (err) {
      console.log('error');
    }

    let results = 'No matches';

    if(searchType === 'category'){
      results = await db.getSearchedArticles({ category : { $in : [searchValue]}}, page);
    } 
    if (searchType === 'headline') {
      results = await db.getSearchedArticles({ headline : { $regex : searchValue}});
    }
    res.status(200).json({'search method' : searchType, 'result' : results });
  } catch (err) {
    res.status(500).json({ 'error' : err});
  }
};