// ------------------------------------
require('dotenv').config();
// ------------------------------------

const { ApolloServer } = require('apollo-server');

// MongoDB
const connectToMongo = require('./config/mongoose');

// GraphQL
const { typeDefs, resolvers } = require('./graphql');

const decodeUserToken = require('./helpers/decodeUserToken');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    const token = req.headers.authorization.split(' ')[1] || '';

    if (token !== '') {
      const user = await decodeUserToken(token);

      if (user !== null) {
        req.user = user;
      }
    }

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

connectToMongo(() => {
  console.log('\nDATABASE: conected\n');
  server
    .listen({ port: process.env.APOLLO_PORT })
    .then(({ url, subscriptionsUrl }) => {
      console.log(`🚀 Server ready at ${url}`);
      console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
    });
});
