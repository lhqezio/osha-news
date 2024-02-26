require('dotenv').config();
const dbUrl = process.env.ATLAS_URI;
const { MongoClient } =  require('mongodb');

let instance = null;

class DB {
  constructor() {
    if (!instance) {
      this.client = new MongoClient(dbUrl);
      this.db = null;
      
      // add collections
      this.collection = null;

      instance = this;
    }
    return instance;
  }

  /**
   * Connect to specified database
   * @param dbname name of the database
   */
  async connect(dbname){
    if (instance.db) {
      return;
    }

    await instance.client.connect();
    instance.db = await instance.client.db(dbname);

    // Connect to collections
    this.createAllCollection();
    instance.newsArticles = await instance.db.collection('newsArticles');
    instance.userComments = await instance.db.collection('userComments');
    instance.userImages = await instance.db.collection('userImages');
  }

  /**
   * Create all collection needed for the app.
   */
  async createAllCollection() {
    if (!instance.db) {
      return;
    }

    const collNames = await instance.db.listCollections().toArray();

    if (collNames.filter(coll => coll.name === 'newsArticles').length === 0) {
      await instance.db.createCollection('newsArticles');
    }
    if (collNames.filter(coll => coll.name === 'userComments').length === 0) {
      await instance.db.createCollection('userComments');
    }
    if (collNames.filter(coll => coll.name === 'userImages').length === 0) {
      await instance.db.createCollection('userImages');
    }
  }

  /**
   * Close database connection
   */
  async close() {
    await instance.client.close();
    instance = null;
  }

  /**
   * Add many rows of news data
   * @param articles list article to add to newsArticles
   */
  async createManyNewsArticles(articles) {
    await instance.newsArticles.insertMany(articles);
  }

  /**
   * Get one article
   * @returns first article
   */
  async getOneArticle() {
    const article = await instance.newsArticles.findOne();
    return article;
  }

  /** 
   * Get random articles acording to a filter
   * @param filter
   * @param amount
   * @returns random article
   */
  async getRandomArticle(filter, amount) {
    const articles = await instance.newsArticles.aggregate(
      [
        { $match: filter },
        { $sample: { size: amount } }
      ]
    ).toArray();
    
    return articles;
  }

  /**
   * Get all articles that match query
   */
  async getSearchedArticles(query, page) {
    const articles = await instance.newsArticles.aggregate(
      [
        {
          $match: { query }
        },
        { 
          $facet: 
          { metadata: [{ $count: 'totalCount' }], 
            data: [{ $skip: (page - 1) * 50 }, { $limit: 50 }]} 
        }
      ]
    ).toArray();
    return articles;
  }

  /**
   * Remove from the Database using filter.
   * @param filter filter for the delete
   * @returns amount of element deleted
   */
  async deleteMany(filter) {
    const newsArticlesResult = await instance.newsArticles.deleteMany(filter);
    const userCommentsResult = await instance.userComments.deleteMany(filter);
    const userImagesResult = await instance.userImages.deleteMany(filter);
    return  newsArticlesResult.deletedCount + 
            userCommentsResult.deletedCount + 
            userImagesResult.deletedCount;
  }

  /**
   * Add one user-comment
   * @param comment single comment to add to userComments
   */
  async createUserComment(comment) {
    await instance.userComments.insertMany([comment]);
  }

  /**
   * Get userComments
   * @param filter filter of the search
   * @returns comments found 
   */
  async getUserComments(filter) {
    const comments = await instance.userComments.find(filter).toArray();
    return comments;
  }

  /**
   * Add one user-image
   * @param image single image to add to userImage
   */
  async createUserImage(image){
    await instance.userImages.insertMany([image]);
  }

  /**
   * Get userImages
   * @param filter filter of the search
   * @returns images found
   */
  async getUserImages(filter){
    const images = await instance.userImages.find(filter).toArray();
    return images;
  }

  /**
   * Get all categories in db
   * @returns categories found
   */
  async getCategories() {
    const categories = await instance.newsArticles.distinct('category');
    return categories;
  }
}

module.exports = DB;
