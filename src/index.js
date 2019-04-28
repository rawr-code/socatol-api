import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';

import morgan from 'morgan';
import cors from 'cors';

import connectToMongo from './config/mongoose';

import typeDefs from './schema';
import resolvers from './resolvers';

// Initialization
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
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

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

// Connect to database and run app
connectToMongo(httpServer);
