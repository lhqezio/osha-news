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

  async connect(dbname, colName){
    if (instance.db) {
      return;
    }

    await instance.client.connect();
    instance.db = await instance.client.db(dbname);

    // connect to collections
    instance.collection = await instance.db.collection(colName);
  }

  async connectToCollection(dbname, colName) {
    instance.db = await instance.client.db(dbname);
    instance.collection = await instance.db.collection(colName);
  }

  async close() {
    await instance.client.close();
    instance = null;
  }

  /**
   * Add many rows of news data
   */
  async createManyNewsArticles(articles) {
    await instance.collection.insertMany(articles);
  }

  /**
   * Remove articles from the Database using filter.
   * @param filter filter for the delete
   */
  async deleteManyArticles(filter) {
    const result = await instance.collection.deleteMany(filter);
    return result.deletedCount;
  }

  /**
   * Add one user-comment
   */
  async createUserComment(comment) {
    await instance.collection.insertMany([comment]);
  }
}

module.exports = DB;