const DB = require('../db/db');

const db = new DB();

/**
 * Route method for "/user-comment"
 * Get user comments from database
 */
module.exports.getUserComments = async (req, res) => {
  try {
    // Get all user
    const userComments = await db.getUserComments({});
    // Remove the id from MongoDB
    const cleanUserComments = userComments.map((c) => {
      return {
        name: c.name,
        comment: c.comment
      };
    });

    res.status(200).json(cleanUserComments);
  } catch (err) {
    res.status(500).json({'error': 'Internal Error.'});
  }
};

/**
 * Route method for "/user-comment"
 * Add user comments to database
 */
module.exports.addUserComment = async (req, res) => {
  try {
    const userComment = req.body;
  
    await db.createUserComment(userComment);
  
    res.status(201).json({'status': 'User Comment as successfully been added.'});
  } catch (err) {
    res.status(500).json({'error': 'Internal Error.'});
  }
};