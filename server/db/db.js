require('dotenv').config();
const dbUrl = process.env.ATLAS_URI;
const mongoose = require('mongoose');

(async () => {
  await mongoose.connect(dbUrl).
    catch(console.log);
})();

// Article
const articleSchema = mongoose.Schema({
  link: String,
  headline: String,
  category: String,
  text: String,
  authors: String,
  date: String,
  image: String
});

const ArticleModel = new mongoose.model('newsArticles', articleSchema);

/**
  * Add many rows of news data
  * @param articles list article to add to newsArticles
  */
module.exports.createManyNewsArticles = async (articles) => {
  await ArticleModel.insertMany(articles);
};

/**
 * Get one article
 */
module.exports.getOneArticle = async () => {
  const article = await ArticleModel.findOne();
  return article;
};

/**
 * Get a list of all the articles category
 * @returns List of active catecories
 */
module.exports.getCategories = async () => {
  const categories = await ArticleModel.distinct('category');
  return categories;
};

/** 
 * Get random articles acording to a filter
 * @param filter
 * @param amount
 * @returns random article
 */
module.exports.getRandomArticle = async (filter, amount) => {
  const articles = await ArticleModel.aggregate(
    [
      { $match: filter },
      { $sample: { size: amount } }
    ]
  );

  return articles;
};

/**
 * Get all articles that match query
 * @param query query that the search must match (limiter)
 * @param page page number that chooses which range the values will come from (pagination)
 * @returns articles that match the query and in the range of pagination page number
 */
module.exports.getSearchedArticles = async (query, page) => {
  const articles = await ArticleModel.aggregate(
    [
      { 
        $match: query 
      },
      { 
        $facet: 
        { data: [{ $skip: (page - 1) * 50 }, { $limit: 50 }]} 
      }
    ]
  );

  return articles;
};

// Utils
/**
 * Remove from the Database using filter.
 * @param filter filter for the delete
 * @returns amount of element deleted
 */
module.exports.emptyDatabase = async () => {
  const newsArticleResult = await ArticleModel.deleteMany();
  return newsArticleResult.deletedCount;
};