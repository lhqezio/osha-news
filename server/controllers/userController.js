const { getUser, searchUsers } = require('../db/db');

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

/**
 * Search users by name
 * @param req request made by api
 * @param res response sent by api
 * @param req.query.name name used in search
 * @param req.query.page page number to search
 * @param req.qeury.amount amount of searches per call
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