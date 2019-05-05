const { gql } = require('apollo-server');

module.exports = gql`
  type BankAccount {
    id: ID
    name: String
    bank: String
    type: BankAccountTypes
    number: String
    active: Boolean
  }

  enum BankAccountTypes {
    CORRIENTE
    AHORRO
  }

  input BankAccountInput {
    id: ID
    name: String!
    bank: String!
    type: BankAccountTypes!
    number: String!
    active: Boolean!
  }

  extend type Query {
    getBankAccount(id: ID!): BankAccount
    getBankAccounts(limit: Int, offset: Int): [BankAccount]
  }

  extend type Mutation {
    newBankAccount(input: BankAccountInput!): String
    updateBankAccount(input: BankAccountInput!): String
    deleteBankAccount(id: ID!): String
  }
`;
