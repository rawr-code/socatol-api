const jwt = require('jsonwebtoken');

const decodeUserToken = async token => {
  try {
    const tokenInfo = await jwt.verify(token, process.env.SECRET_KEY);
    const user = tokenInfo.id;

    return user;
  } catch (err) {
    return null;
  }
};

module.exports = decodeUserToken;
