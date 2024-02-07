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
      this.newsArticles = null;

      instance = this;
    }
    return instance;
  }

  async connect(dbname, colName){
    if (instance.db) {
      return;
    }

    await instance.client.connect();
    instance.db = await instance.client.db(dbname);

    // connect to collections
    instance.newsArticles = await instance.db.collection(colName);
  }

  async close() {
    await instance.client.close();
    instance = null;
  }

  /**
   * Add many rows of news data
   */
  async createManyNewsArticles(articles) {
    return await instance.newsArticles.insertMany(articles);
  }
}

module.exports = DB;