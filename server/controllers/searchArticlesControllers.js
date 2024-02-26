const DB = require('../db/db');
const db = new DB();

module.exports.searchAllArticles = async (req, res) => {
  try{
    const searchType = req.query.searchtype;
    const searchValue = req.query.searchvalue;
    const pageNum = 1;

    let results = 'No matches';

    if(searchType === 'category'){
      results = await db.getSearchedArticles({ category : { $in : [searchValue]}}, pageNum);
    } 
    if (searchType === 'headline') {
      results = await db.getSearchedArticles({ headline : { $regex : searchValue}});
    }
    res.status(200).json({'search method' : searchType, 'result' : results });
  } catch (err) {
    res.status(500).json({ 'error' : 'Internal Error'});
  }
};