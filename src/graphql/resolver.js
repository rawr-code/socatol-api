const { Subscriptions } = require('./subscriptions');
const Query = require('./queries');
const Mutation = require('./mutations');

const resolvers = {
  Subscription: Subscriptions,
  Query,
  Mutation
};

module.exports = resolvers;
