const { OAuth2Client } = require('google-auth-library');
const db = require('../db/db');

const clientId = process.env.GOOGLE_CLIENT_ID;

module.exports.authenticate = async (req, res) => {
  const client = new OAuth2Client(clientId);

  const ticket = await client.verifyIdToken({
    idToken: req.body.token,
    audience: req.body.token.client_id,
  });

  const payload = ticket.getPayload();

  if (payload.email_verified) {
    db.upsertUserAccount(payload);
    req.session.userId = payload.email;
    console.log('AUTH: ' + req.session.userId);
    res.status(200).json({ confirmation : true });
    return;
  }


  res.status(403).json({ confirmation : false });
};