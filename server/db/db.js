require('dotenv').config();
const dbUrl = process.env.ATLAS_URI;
const mongoose = require('mongoose');

(async () => {
  await mongoose.connect(dbUrl).
    catch(console.error);
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

// User
const userSchema = mongoose.Schema({
  email: String,
  name: String,
  image: String
});

module.exports.ArticleModel = new mongoose.model('newsarticles', articleSchema);
module.exports.UserModel = new mongoose.model('users', userSchema);

/**
  * Add many rows of news data
  * @param articles list article to add to newsArticles
  */
module.exports.createManyNewsArticles = async (articles) => {
  await this.ArticleModel.insertMany(articles);
};

/**
 * Get one article
 */
module.exports.getOneArticle = async () => {
  const article = await this.ArticleModel.findOne();
  return article;
};

/**
 * Get a list of all the articles category
 * @returns List of active catecories
 */
module.exports.getCategories = async () => {
  const categories = await this.ArticleModel.distinct('category');
  return categories;
};

/** 
 * Get random articles acording to a filter
 * @param filter
 * @param amount
 * @returns random article
 */
module.exports.getRandomArticle = async (filter, amount) => {
  const articles = await this.ArticleModel.aggregate(
    [
      { $match: filter },
      { $sample: { size: amount } }
    ]
  );

  return articles;
};

/**
 * Get all articles that match query
 * @param filter Search in the headline
 * @param category List of category to search in
 * @param page Page number that chooses which range the values will come from (pagination)
 * @param amount Amount of article per page
 * @returns articles that match the query and in the range of pagination page number
 */
module.exports.getSearchedArticles = async (filter, category, page, amount) => {
  if (!category || category === null) {
    category = [/^/];
  }
  const articles = await this.ArticleModel.aggregate(
    [
      { 
        $match: { $and: [
          { headline: { $regex : filter }}, 
          {category: {$in: category}}
        ]} 
      },
      { 
        $facet: 
        { data: [{ $skip: (page - 1) * amount }, { $limit: amount }]} 
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
  const newsArticleResult = await this.ArticleModel.deleteMany();
  return newsArticleResult.deletedCount;
};