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
  }

  async createAllCollection() {
    const collNames = await instance.db.listCollections().toArray();

    if (collNames.filter(coll => coll.name === 'newsArticles').length === 0) {
      await instance.db.createCollection('newsArticles');
    }
    if (collNames.filter(coll => coll.name === 'userComments').length === 0) {
      await instance.db.createCollection('userComments');
    }
  }

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
   * Remove from the Database using filter.
   * @param filter filter for the delete
   * @returns amount of element deleted
   */
  async deleteMany(filter) {
    const newsArticlesResult = await instance.newsArticles.deleteMany(filter);
    const userCommentsResult = await instance.userComments.deleteMany(filter);
    return newsArticlesResult.deletedCount + userCommentsResult.deletedCount;
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
    const comments = await instance.userComments.find(filter);
    return comments;
  }
}

module.exports = DB;