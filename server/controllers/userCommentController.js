const DB = require('../db/db');

const db = new DB();

module.exports.getUsers = async (req, res) => {
  res.send('User');
};

module.exports.addUser = async (req, res) => {
  try {
    const userComment = req.body;
  
    await db.createUserComment(userComment);
  
    res.status(201).json({'status': 'User Comment as successfully been added.'});
  } catch (err) {
    res.status(500).json({'error': 'Could not add user comment.'});
  }
};