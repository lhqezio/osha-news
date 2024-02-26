require('dotenv').config();
const dbUrl = process.env.ATLAS_URI;
const mongoose = require('mongoose');

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(dbUrl);
}

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
module.exports.createManyNewsArticles = async(articles) => {
  await ArticleModel.insertMany(articles);
};

/**
 * Remove from the Database using filter.
 * @param filter filter for the delete
 * @returns amount of element deleted
 */
module.exports.emptyDatabase = async() => {
  const newsArticleResult = await ArticleModel.deleteMany();
  return newsArticleResult.deletedCount;
};

/**
 * Get one article
 */
module.exports.getOneArticle = async() => {
  const article = await ArticleModel.findOne();
  return article;
};

// /**
//  * Add one user-comment
//  * @param comment single comment to add to userComments
//  */
// async createUserComment(comment) {
//   await instance.userComments.insertMany([comment]);
// }

// /**
//  * Get userComments
//  * @param filter filter of the search
//  * @returns comments found 
//  */
// async getUserComments(filter) {
//   const comments = await instance.userComments.find(filter).toArray();
//   return comments;
// }

// /**
//  * Add one user-image
//  * @param image single image to add to userImage
//  */
// async createUserImage(image){
//   await instance.userImages.insertMany([image]);
// }

// /**
//  * Get userImages
//  * @param filter filter of the search
//  * @returns images found
//  */
// async getUserImages(filter){
//   const images = await instance.userImages.find(filter).toArray();
//   return images;
// }

module.exports.getCategories = async() => {
  const categories = await ArticleModel.distinct('category');
  return categories;
};
