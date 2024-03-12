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
    res.send({ 'email' : user[0].email });
  }
};