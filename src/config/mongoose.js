// ------------------------------------
const dotenv = require('dotenv').config;
dotenv();
// ------------------------------------

const mongoose = require('mongoose');
const { MONGO_URL, MONGO_PORT, DB_NAME } = process.env;
const mongoUrl = `mongodb://${MONGO_URL}:${MONGO_PORT}/${DB_NAME}`;

module.exports = callback =>
  mongoose
    .connect(mongoUrl, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true
    })
    .then(() => {
      callback(mongoose.connection);
    })
    .catch(err =>
      console.log(`Error al conectar con la base de datos: ${err}`)
    );
