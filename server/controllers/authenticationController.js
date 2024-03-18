const { OAuth2Client } = require('google-auth-library');
const { addNewGoogleUser, getUser, addNewUser } = require('../db/db');

// id used by google authentication
const clientId = process.env.GOOGLE_CLIENT_ID;

/**
 * Authenticates user token using Google Authentication
 * @param req request made by api
 * @param res response made by api
 * @param req.body.token token that is being authenticated 
 */
module.exports.authenticateGoogle = async (req, res) => {
  const client = new OAuth2Client(clientId);

  const ticket = await client.verifyIdToken({
    idToken: req.body.token,
    audience: req.body.token.client_id,
  });

  const payload = ticket.getPayload();

  if (payload.email_verified) {
    addNewGoogleUser(payload);
    req.session.userId = payload.email;
    res.status(200).json({ confirmation : true });
    return;
  }
  res.status(401).json({ confirmation : false });
};

/**
 * Authenticate through our database
 */
module.exports.authenticate = async (req, res) => {
  const email = req.body.email;

  const user = getUser(email);
  if (user[0]){
    res.status(400).json({ 'message' : 'User already exists with that email' });
    return;
  }
  const name = req.body.name;
  const image = req.body.image;
  const password = req.body.password;

  console.log(name);

  addNewUser({
    name : name,
    email : email,
    posts : [],
    image : image,
    password : password
  });

  res.status(200).json({ 'confirmation' : true });
};