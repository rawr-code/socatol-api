const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');

// For Development
const morgan = require('morgan');

// Configurations
const connectToMongo = require('./db/config/mongoose');

// GraphQL
const { modules } = require('./graphql');

// Initialization
const app = express();
const server = new ApolloServer({
  modules,
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      console.log(connection);
      return connection.context;
    } else {
      // check from req
      const token = req.headers.authorization || '';

      return { token };
    }
  }
});

app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  next();
});

// Middlewares
app.use(morgan('dev'));
app.use(cors());

server.applyMiddleware({ app });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

// Connect to database and run app
connectToMongo(httpServer);
