const { getUser, searchUsers, getUserPosts, addUserDescription } = require('../db/db');

/**
 * Express Controller
 * Gets user and send info about user that is authenticated
 * @param {Express.Request} req Request sent by api 
 * @param {Express.Response} res Response sent by api
 * @param {String} req.session.userId Session user email
 */
module.exports.getUserInfo = async (req, res) => {
  const user = await getUser(req.session.userId);
  if (user[0]){
    res.status(200).json({ 
      'email' : user[0].email,
      'name' : user[0].name,
      'image' : user[0].image,
      'description' : user[0].description
    });
  }
};

/**
 * Express Controller
 * Logs out session user
 * @param {Express.Request} req Request sent by api
 * @param {Express.Response} res Response sent by api
 * @param {*} req.session Session token that holds user info
 */
module.exports.logout = async (req, res) => {
  await req.session.destroy();
  res.status(200).json({ 'message' : 'Logout Successful' });
};

/**
 * Express Controller
 * Search users by name
 * @param {Express.Request} req Request made by api
 * @param {Express.Response} res Response sent by api
 * @param {String} req.query.name Name used in search
 * @param {Number} req.query.page Page number to search
 * @param {Number} req.qeury.amount Amount of searches per call
 */
module.exports.searchUsers = async (req, res) => {
  const name = req.query.name;
  const page = req.query.page;
  const amount = req.query.amount;

  // set base page to 1 and amount to 10
  let pageBase = 1;
  let amountBase = 10;
  
  // Attempt to parse page num to int, will default to 1 if value is NaN or <=0
  if (page){
    const temp = parseInt(page);
    if (temp > 0) {
      pageBase = temp;
    }
  }
      
  // Attempt to parse amount num to int, will default to 10 if value is NaN or <=0
  if (amount){
    const temp = parseInt(amount);
    if (temp > 0) {
      amountBase = temp;
    }
  }

  const users = await searchUsers(name, pageBase, amountBase);
  res.send(users);
};

/**
 * Get posts written by a specific user
 * @param {Express.Request} req Request made by api
 * @param {Express.Response} res Response sent by api
 * @param {String} req.query.user User to search for posts
 */
module.exports.getUserPosts = async (req, res) => {
  try{
    const user = req.query.user;

    if (!user){
      res.status(400).json({ 'Error' : 'No user given' });
    }
    const posts = await getUserPosts(user);
  
    res.status(200).json({ 'posts' : posts });
  } catch (err){
    res.status(500).json({ 'Error' : 'Internal Server Error'});
  }

};

/**
 * Change a users description
 * @param {Express.Request} req Request made by api
 * @param {Express.Response} res Response sent by api
 */
module.exports.addUserDescription = async (req, res) => {
  try{
    const description = req.body.description;

    if (!description){
      res.status(400).json({'error' : 'no description given'});
      return;
    }
    addUserDescription(description, req.session.userId);

    res.status(200).json({'status' : 'description changes'});
  } catch(err) {
    res.status(500).json({ 'Error' : 'Internal Server Error'});
  }
};