const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { User } = require('../models');

const tokenGenerator = async (payload, secretKey, options) => {
  try {
    const token = await jwt.sign(payload, secretKey, options);
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  user: async (root, { id }) => {
    try {
      const user = await User.findById(id);

      return user;
    } catch (error) {
      console.log(error);
    }
  },
  users: async (root, { limit, offset }) => {
    try {
      const users = await User.find({})
        .limit(limit)
        .skip(offset);

      return users;
    } catch (error) {
      console.log(error);
    }
  },
  authUser: async (root, { token }, context) => {
    try {
      let user = null;

      if (token !== '') {
        const { id } = await jwt.verify(token, process.env.SECRET_KEY);
        user = await User.findById(id);
      } else {
        const userId = context.user;
        if (!userId) return null;

        user = await User.findById(userId);
      }

      return user;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },
  addUser: async (root, { input }) => {
    try {
      const searchUsername = await User.findOne({ username: input.username });
      if (searchUsername) return 'este nombre esta en uso';
      else {
        const user = new User({
          username: input.username,
          password: input.password,
          role: input.role
        });

        await user.save();

        console.log(user);
        return 'exito';
      }
    } catch (error) {
      console.log(error);
    }
  },
  userToken: async (root, { input }) => {
    try {
      const user = await User.findOne({ username: input.username });

      if (!user) {
        return 'Usuario no encontrado';
      } else {
        const match = await bcrypt.compare(input.password, user.password);
        if (!match) {
          return 'Usuario o contraseña incorrecto';
        } else {
          const payload = {
            id: user.id,
            user: user.username
          };
          const secret = process.env.SECRET_KEY;
          const options = {
            expiresIn: '12h'
          };

          const token = tokenGenerator(payload, secret, options);

          return {
            token
          };
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};
