const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');

// Server Configurations
const connectToMongo = require('./config/mongoose');

// GraphQL
const { modules } = require('./graphql');

// For Development
const morgan = require('morgan');

// Initialization Server
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  next();
});

const httpServer = createServer(app);

const apolloServer = new ApolloServer({
  modules
});

apolloServer.applyMiddleware({ app });

// Connect to database and run app
connectToMongo(httpServer);
