module.exports.getUsers = async (req, res) => {
  res.send('User');
};

module.exports.addUser = async (req, res) => {
  res.send(req.body);
};