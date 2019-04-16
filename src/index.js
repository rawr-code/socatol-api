import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import morgan from 'morgan';
import cors from 'cors';

import typeDefs from './schema';
import resolvers from './resolvers';

// Initialization
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  next();
});

// Middlewares
app.use(morgan('dev'));
app.use(cors());
server.applyMiddleware({ app });

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

// Passport Config
// app.use(passport.initialize());
// require('./config/passport')(passport);

// Connect to database and run app
require('./config/mongoose')(app);
