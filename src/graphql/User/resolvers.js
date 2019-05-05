const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../db/config');

const { User } = require('../../db/models');

const tokenGenerator = async (payload, secretKey, options) => {
  try {
    const token = await jwt.sign(payload, secretKey, options);
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Query: {},
  Mutation: {
    newUser: async (root, { input }) => {
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
    authUser: async (root, { input }) => {
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
            const secret = config.JWT_SECRET;
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
  }
};
