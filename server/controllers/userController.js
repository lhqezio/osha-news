module.exports.login = (req, res) => {
  console.log(req.session.userId);
  if (req.session.userId){
    res.send({ 'currentUser' : req.session.userId});
  }

};