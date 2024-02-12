const DB = require('../db/db');

const db = new DB();

/**
 * Route method for "/user-image"
 * Get user images from database
 */
module.exports.getUserImages = async (req, res) => {
  try {
    // Get all user
    const userImages = await db.getUserImages({});
    // Remove the id from MongoDB
    const cleanUserImages = userImages.map((c) => {
      return {
        name: c.name,
        image: c.image
      };
    });

    res.status(200).json(cleanUserImages);
  } catch (err) {
    res.status(500).json({'error': 'Internal Error.'});
  }
};

/**
 * Route method for "/user-image"
 * Add user images to database
 */
module.exports.addUserImage = async (req, res) => {
    try {
      const userImage = req.body;
    
      await db.createUserComment(userImage);
    
      res.status(201).json({'status': 'User Image as successfully been added.'});
    } catch (err) {
      res.status(500).json({'error': 'Internal Error.'});
    }
  };