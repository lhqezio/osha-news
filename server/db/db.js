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

    // connect to collections
  }

  async close() {
    await instance.client.close();
    instance = null;
  }

}

module.exports = DB;