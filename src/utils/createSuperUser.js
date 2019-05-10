// Include prompt module.
const prompt = require('prompt');
const colors = require('colors/safe');
const connectToMongo = require('../config/mongoose');

// Models
const User = require('../models/User');

prompt.message = colors.green('>');
prompt.delimiter = colors.green(' ');

// This json object is used to configure what data will be retrieved from command line.
const prompt_attributes = [
  {
    // The fist input text is assigned to username variable.
    name: 'username',
    message: 'Nombre de usuario',
    // The username must match below regular expression.
    validator: /^[a-zA-Z\s\-]+$/,
    // If username is not valid then prompt below message.
    warning: 'usuario invalido',
    required: true
  },
  {
    // The second input text is assigned to password variable.
    name: 'password',
    // Do not show password when user input.
    hidden: true,
    required: true
  }
];

// Mongoose Configuration
const DB = 'mongodb://localhost/socatol-api-graphql';

connectToMongo(DB, connection => {
  prompt.start();

  // Prompt and get user input then display those data in console.
  prompt.get(prompt_attributes, async (err, result) => {
    try {
      if (err) {
        console.log(err);
        return 1;
      } else {
        const { username, password } = result;

        const user = new User({
          username,
          password,
          role: 'ADMINISTRADOR'
        });

        await user.save();

        connection.close();
      }
    } catch (error) {
      console.error(error);
    }
  });
});
