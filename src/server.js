const express = require('express');
const ApolloServer = require('apollo-server-express').ApolloServer;
const morgan = require('morgan');
// const cors = require('cors');
// const passport = require('passport');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Initialization
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  // );
  // res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

// Middlewares
app.use(morgan('dev'));
// app.use(cors());
server.applyMiddleware({ app });

// Passport Config
// app.use(passport.initialize());
// require('./config/passport')(passport);

// Connect to database and run app
require('./config/mongoose')(app);
