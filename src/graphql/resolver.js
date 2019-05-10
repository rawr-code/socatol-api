// const { PubSub } = require('apollo-server');

const Query = require('./queries');
const Mutation = require('./mutations');

// const pubsub = new PubSub();

const resolvers = {
  Query,
  Mutation
};

module.exports = resolvers;
