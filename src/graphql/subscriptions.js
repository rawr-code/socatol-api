const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

// Subscriptions Types
const { WAREHOUSE_ADDED } = require('./subscriptionsTypes');

const Subscriptions = {
  warehouseAdded: {
    // Additional event labels can be passed to asyncIterator creation
    subscribe: () => pubsub.asyncIterator([WAREHOUSE_ADDED])
  }
};

module.exports = { Subscriptions, pubsub };
