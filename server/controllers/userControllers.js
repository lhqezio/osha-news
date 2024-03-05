const { OAuth2Client } = require('google-auth-library');

const clientId = process.env.GOOGLE_CLIENT_ID;

module.exports.login = async (req, res) => {
  const client = new OAuth2Client(clientId);

  const ticket = await client.verifyIdToken({
    idToken: req.body.token,
    audience: req.body.token.client_id,
  });

  const payload = ticket.getPayload();

  res.json(payload);
};