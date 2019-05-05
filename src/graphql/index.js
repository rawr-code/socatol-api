// Modules
const Configuration = require('./Configuration');
const Warehouse = require('./Warehouse');
const Product = require('./Product');
const BankAccount = require('./BankAccount');
const Invoice = require('./Invoice');
const PersonalInformation = require('./PersonalInformation');
const File = require('./File');
const User = require('./User');

const modules = [
  Configuration,
  Warehouse,
  Product,
  BankAccount,
  Invoice,
  PersonalInformation,
  File,
  User
];

module.exports = { modules };
