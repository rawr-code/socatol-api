// const { PubSub } = require('apollo-server');
const configurationController = require('../controllers/configuration.controller');
const userController = require('../controllers/user.controller');
const bankAccountController = require('../controllers/bankAccount.controller');
const bankTransactionController = require('../controllers/bankTransaction.controller');
const invoiceController = require('../controllers/invoice.controller');
const personController = require('../controllers/person.controller');
const warehouseController = require('../controllers/warehouse.controller');
const productController = require('../controllers/product.controller');

// const pubsub = new PubSub();

const Queries = {
  // Configuration_Query
  configuration: (root, args, context) => {
    return configurationController.configuration(root, args);
  },
  // User_Query
  user: (root, args, context) => {
    return userController.user(root, args);
  },
  users: (root, args, context) => {
    return userController.users(root, args);
  },
  authUser: (root, args, context) => {
    return userController.authUser(root, args, context);
  },
  // BankAccount_Query
  bankAccount: (root, args, context) => {
    return bankAccountController.bankAccount(root, args);
  },
  bankAccountTransactions: (root, args, context) => {
    return bankAccountController.bankAccountTransactions(root, args);
  },
  bankAccounts: (root, args, context) => {
    return bankAccountController.bankAccounts(root, args);
  },
  // BankTransaction_Query
  bankTransactionFile: (root, args, context) => {
    return bankTransactionController.bankTransactionFile(root, args);
  },
  bankTransactionFiles: (root, args, context) => {
    return bankTransactionController.bankTransactionFiles(root, args);
  },
  // Invoice_Query
  invoice: (root, args, context) => {
    return invoiceController.invoice(root, args);
  },
  invoices: (root, args, context) => {
    return invoiceController.invoices(root, args);
  },
  // Person_Query
  person: (root, args, context) => {
    return personController.person(root, args);
  },
  persons: (root, args, context) => {
    return personController.persons(root, args);
  },
  // Warehouse_Query
  warehouse: (root, args, context) => {
    return warehouseController.warehouse(root, args);
  },
  warehouses: (root, args, context) => {
    return warehouseController.warehouses(root, args);
  },
  // Product_Query
  product: (root, args, context) => {
    return productController.product(root, args);
  },
  products: (root, args, context) => {
    return productController.products(root, args);
  }
};

module.exports = Queries;
