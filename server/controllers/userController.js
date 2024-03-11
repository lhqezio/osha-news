/**
 * Login user and send info to front-end
 * @param req request sent by api 
 * @param res response sent by api
 * @param req.session.userId session user email
 */
module.exports.login = (req, res) => {
  console.log(req.session.userId);
  if (req.session.userId){
    res.send({ 'currentUser' : req.session.userId});
  }
};