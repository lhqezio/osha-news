const { getUser } = require('../db/db');

/**
 * Login user and send info to front-end
 * @param req request sent by api 
 * @param res response sent by api
 * @param req.session.userId session user email
 */
module.exports.login = async (req, res) => {
  const user = await getUser(req.session.userId);
  if (user[0]){
    res.status(200).json({ 
      'email' : user[0].email,
      'name' : user[0].name,
      'image' : user[0].image,
      'posts' : user.posts
    });
  }
};

/**
 * Logs out session user
 * @param req request sent by api
 * @param res response sent by api
 * @param req.session session token that holds user info
 */
module.exports.logout = async (req, res) => {
  await req.session.destroy();
  res.status(200).json({ 'message' : 'Logout Successful' });
};