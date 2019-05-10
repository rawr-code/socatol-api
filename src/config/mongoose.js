const mongoose = require('mongoose');

module.exports = (db, callback) =>
  mongoose
    .connect(db, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true
    })
    .then(() => {
      console.log('\n');
      callback(mongoose.connection);
    })
    .catch(err =>
      console.log(`Error al conectar con la base de datos: ${err}`)
    );
