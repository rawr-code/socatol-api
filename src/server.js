const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

// Mongoose Configuration
const PORT = process.env.PORT || 5000;
const DB = 'mongodb://localhost/socatol-api-graphql';

// GraphQL
const { typeDefs, resolvers } = require('./graphql');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    } else {
      // check from req
      const token = req.headers.authorization || '';

      return { token };
    }
  }
});

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('\nDATABASE STATUS: conected\n');
    server.listen({ port: PORT }).then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  })
  .catch(err => console.log(`Error al conectar con la base de datos: ${err}`));
