const jwt = require('jsonwebtoken');

const generateToken = (tenantName) => {
  const apiPrivateKey = process.env.BOT_JWT_KEY;

  const jwtToken = jwt.sign({
    tenantName,
    iat: Math.floor(Date.now()  / 1000)
  }, apiPrivateKey);

  return jwtToken;
}

module.exports = { generateToken }