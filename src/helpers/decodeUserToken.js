const jwt = require('jsonwebtoken');

const { User } = require('../models');

const decodeUserToken = async token => {
  try {
    const tokenInfo = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(tokenInfo.id);

    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = decodeUserToken;
