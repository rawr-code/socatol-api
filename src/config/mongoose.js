const mongoose = require('mongoose');
const config = require('../config');

module.exports = server =>
  mongoose
    .connect(config.db, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true
    })
    .then(db => {
      console.log('DataBase is conected!');
      server.listen(config.port, () => {
        console.log(
          `Server listening on https://localhost:${config.port}/graphql`
        );
      });
    })
    .catch(err =>
      console.log(`Error al conectar con la base de datos: ${err}`)
    );
