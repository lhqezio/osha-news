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

const ArticleModel = new mongoose.model('newsarticles', articleSchema);


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
  const articles = await ArticleModel.aggregate(
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

// Google User
const googleUserSchema = mongoose.Schema({
  email: String,
  name: String,
  posts: Array,
  image: String
});

const GoogleUserModel = new mongoose.model('google-users', googleUserSchema);

/**
 * Add a user to database only if they don't already exist
 * @param user user info from authentication 
 */
module.exports.addNewGoogleUser = async (user) => {
  // Check if the user already exists using email
  const userExists = await GoogleUserModel.find({ email: user.email });

  if (userExists.length === 0) { 
    const newUser = new GoogleUserModel({
      email: user.email, name: user.name, posts: [], image: user.picture
    });                                                   
    await newUser.save();
  }
};

module.exports.getGoogleUser = async (email) => {
  const user = await GoogleUserModel.find({ email : email });
  return user;
};

// OSHA users
const userSchema = mongoose.Schema({
  email: String,
  name: String,
  posts: Array,
  image: String,
  password: String
});
const UserModel = new mongoose.model('users', userSchema);

module.exports.addNewUser = async (user) => {
  // Check if the user already exists using email
  const userExists = await UserModel.find({ email: user.email });

  if (userExists.length === 0) { 
    const newUser = new UserModel({
      email: user.email, name: user.name, posts: [], image: user.picture, password: user.password
    });                                                   
    await newUser.save();
  }
};

module.exports.getUser = async (email) => {
  const user = await GoogleUserModel.find({ email : email });
  return user;
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