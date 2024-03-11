const { OAuth2Client } = require('google-auth-library');
const db = require('../db/db');

const clientId = process.env.GOOGLE_CLIENT_ID;

module.exports.login = async (req, res) => {
  const client = new OAuth2Client(clientId);

  console.log(req.session.userId);

  const ticket = await client.verifyIdToken({
    idToken: req.body.token,
    audience: req.body.token.client_id,
  });

  const payload = ticket.getPayload();

  if (payload.email_verified) {
    db.upsertUserAccount(payload);
    req.session.userId = payload.email;
    res.status(200).json({ confirmation : 'User verified', currentUser : payload.email });
    return;
  }


  res.status(403).json({ confirmation : 'User not validated' });
};