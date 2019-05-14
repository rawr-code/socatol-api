// Controllers
const configurationController = require('../controllers/configuration.controller');
const userController = require('../controllers/user.controller');
const bankAccountController = require('../controllers/bankAccount.controller');
const bankTransactionController = require('../controllers/bankTransaction.controller');
const invoiceController = require('../controllers/invoice.controller');
const personController = require('../controllers/person.controller');
const warehouseController = require('../controllers/warehouse.controller');
const productController = require('../controllers/product.controller');

const { pubsub } = require('./subscriptions');

const Mutations = {
  // Configuration_Mutation
  updateProductIVA: (root, args, context) => {
    return configurationController.updateProductIVA(root, args);
  },
  updateSaleInvoiceNumber: (root, args, context) => {
    return configurationController.updateSaleInvoiceNumber(root, args);
  },
  updatePurchaseInvoiceNumber: (root, args, context) => {
    return configurationController.updatePurchaseInvoiceNumber(root, args);
  },
  // User_Mutation
  addUser: (root, args, context) => {
    return userController.addUser(root, args);
  },
  userToken: (root, args, context) => {
    return userController.userToken(root, args);
  },
  // BankAccount_Mutation
  addBankAccount: (root, args, context) => {
    return bankAccountController.addBankAccount(pubsub, args);
  },
  updateBankAccount: (root, args, context) => {
    return bankAccountController.updateBankAccount(root, args);
  },
  deleteBankAccount: (root, args, context) => {
    return bankAccountController.deleteBankAccount(root, args);
  },
  addBankAccountTransactions: (root, args, context) => {
    return bankAccountController.addBankAccountTransactions(root, args);
  },
  bankAccountTransactionConciliate: (root, args, context) => {
    return bankAccountController.bankAccountTransactionConciliate(root, args);
  },
  // BankTransaction_Mutation
  uploadTransactions: (root, args, context) => {
    return bankTransactionController.uploadTransactions(root, args);
  },
  // Invoice_Mutation
  addInvoice: (root, args, context) => {
    return invoiceController.addInvoice(root, args);
  },
  // Warehouse_Mutation
  addWarehouse: (root, args, context) => {
    return warehouseController.addWarehouse(pubsub, args);
  },
  updateWarehouse: (root, args, context) => {
    return warehouseController.updateWarehouse(root, args);
  },
  deleteWarehouse: (root, args, context) => {
    return warehouseController.deleteWarehouse(root, args);
  },
  // Product_Mutation
  addProduct: (root, args, context) => {
    return productController.addProduct(pubsub, args);
  },
  updateProduct: (root, args, context) => {
    return productController.updateProduct(root, args);
  },
  deleteProduct: (root, args, context) => {
    return productController.deleteProduct(root, args);
  }
};

module.exports = Mutations;
