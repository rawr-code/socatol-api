const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

// Subscriptions Types
const {
  bankAccountTypes,
  warehouseTypes,
  productTypes,
  invoiceTypes
} = require('./subscriptionsTypes');

const Subscriptions = {
  // BankAccount
  bankAccountAdded: {
    subscribe: () => pubsub.asyncIterator([bankAccountTypes.ADD])
  },
  // Warehouse
  warehouseAdded: {
    subscribe: () => pubsub.asyncIterator([warehouseTypes.ADD])
  },
  // Product
  productAdded: {
    subscribe: () => pubsub.asyncIterator([productTypes.ADD])
  },
  // Invoices
  purchaseAdded: {
    subscribe: () => pubsub.asyncIterator([invoiceTypes.ADD_PURCHASE])
  },
  saleAdded: {
    subscribe: () => pubsub.asyncIterator([invoiceTypes.ADD_SALE])
  }
};

module.exports = { Subscriptions, pubsub };
