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
  * @param {Article} articles list article to add to newsArticles
  */
module.exports.createManyNewsArticles = async (articles) => {
  await ArticleModel.insertMany(articles);
};

/**
  * Add one Article
  * @param {Article} article article to add to newsArticles
  * @returns Return the inserted article
  */
module.exports.createNewsArticle = async (article) => {
  const dbArticke = await ArticleModel.create(article);
  return dbArticke;
};

/**
  * update one Article
  * @param {Article} article article to update to newsArticles
  * @returns Return the updated article
  */
module.exports.updateNewsArticle = async (article) => {
  const dbArticke = await ArticleModel.findOneAndUpdate(
    { _id: article._id },
    article,
    { new: true }
  );
  return dbArticke;
};

/**
  * Delete one Article
  * @param {Article} article article to delete in newsArticles
  * @returns Return the updated article
  */
module.exports.deleteNewsArticle = async (article) => {
  const dbArticke = await ArticleModel.deleteOne(
    { _id: article._id }
  );
  return dbArticke;
};

/**
 * Get one article
 * @returns {Article} One Article
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
 * @returns {Array<Article>} random article
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
          { headline: { $regex: filter }}, 
          { category: { $in: category }}
        ]} 
      },
      { 
        $facet: {
          pageResult: [{ $skip: (page - 1) * amount }, { $limit: amount }],
          totalCount: [{ $count: 'count' }]
        }
      }
    ]
  );

  return articles;
};

// User
const userSchema = mongoose.Schema({
  email: String,
  name: String,
  posts: Array,
  image: String
});

const UserModel = new mongoose.model('users', userSchema);

/**
 * Add a user to database only if they don't already exist
 * @param user user info from authentication 
 */
module.exports.addNewUser = async (user) => {
  // Check if the user already exists using email
  const userExists = await UserModel.find({ email: user.email });

  if (userExists.length === 0) { 
    const newUser = new UserModel({
      email: user.email, name: user.name, posts: [], image: user.picture
    });                                                   
    await newUser.save();
  }
};

/**
 * Search for posts written by a user
 * @param user author of the posts to search for
 * @returns all the posts made by a specific user
 */
module.exports.getUserPosts = async (user) => {
  let posts = [];

  posts = await ArticleModel.find({ authors : user }).exec();

  return posts;
};

/**
 * get a user from the database by email
 * @param email email to search
 * @returns user found
 */
module.exports.getUser = async (email) => {
  const user = await UserModel.find({ email : email });
  return user;
};

/**
 * Search for users by name using regex
 * @param filter search parameter filter 
 * @param page page number pagination 
 * @param amount amount of results per page pagination
 * @returns users found with pagination params
 */
module.exports.searchUsers = async (filter, page, amount) => {
  const users = await UserModel.aggregate(
    [
      { 
        $match: { name: { $regex : filter }},  
      },
      { 
        $facet: 
        { data: [{ $skip: (page - 1) * amount }, { $limit: amount }]} 
      }
    ]
  );

  return users;
};

// Comments
const commentSchema = mongoose.Schema({
  postId: String,
  email: String,
  name: String,
  comment: String
});

const CommentModel = new mongoose.model('comments', commentSchema);

/**
 * Add comments to database
 * @param {Comment} comment To add too the database.
 * @returns {CommentModel} Added Comment
 */
module.exports.addComment = async (comment) => {
  const newComment = new CommentModel({
    postId: comment.postId,
    email: comment.email,
    name: comment.name,
    comment: comment.comment
  });
  const result = await newComment.save();
  return result;
};

module.exports.getComments = async (postId) => {
  const comments = await CommentModel.find({
    postId: postId
  });

  return comments;
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