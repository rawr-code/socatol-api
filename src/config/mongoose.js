// ------------------------------------
require('dotenv').config();
// ------------------------------------

const mongoose = require('mongoose');
const { MONGO_URL, MONGO_PORT, DB_NAME } = process.env;
const mongoUrl = `mongodb://administrador:clave1234@${MONGO_URL}:${MONGO_PORT}/${DB_NAME}`;
// mogodb://testUser:xyz123@localhost:27017/test

module.exports = callback =>
  mongoose
    .connect(mongoUrl, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true
    })
    .then(() => {
      if (callback) callback(mongoose.connection);
    })
    .catch(err =>
      console.log(`Error al conectar con la base de datos: ${err}`)
    );
