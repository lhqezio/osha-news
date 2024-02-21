module.exports.searchAllArticles = async (req, res) => {
  try{
    const searchType = req.params.searchType;
    const searchValue = req.params.searchValue;
    res.status(200).json({'search method' : searchType, 'result' : searchValue });
  } catch (err) {
    res.status(500).json({ 'error' : 'Internal Error'});
  }

};