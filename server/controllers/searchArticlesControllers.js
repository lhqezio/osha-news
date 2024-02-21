module.exports.searchAllArticles = async (req, res) => {
  const searchType = req.params.searchType;
  const searchValue = req.params.searchValue;
  res.status(200).json({'search method' : searchType, 'result' : searchValue });
};