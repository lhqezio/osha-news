const { OAuth2Client } = require('google-auth-library');
const { addNewUser } = require('../db/db');

// id used by google authentication
const clientId = process.env.GOOGLE_CLIENT_ID;

/**
 * Authenticates user token using Google Authentication
 * @param req request made by api
 * @param res response made by api
 * @param req.body.token token that is being authenticated 
 */
module.exports.authenticate = async (req, res) => {
  const client = new OAuth2Client(clientId);

  const ticket = await client.verifyIdToken({
    idToken: req.body.token,
    audience: req.body.token.client_id,
  });

  const payload = ticket.getPayload();

  if (payload.email_verified) {
    addNewUser(payload);
    req.session.userId = payload.email;
    res.status(200).json({ confirmation : true });
    return;
  }
  res.status(401).json({ confirmation : false });
};