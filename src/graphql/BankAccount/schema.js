const { gql } = require('apollo-server');

module.exports = gql`
  type BankAccount {
    id: ID
    name: String
    bank: String
    type: BankAccountTypes
    number: String
  }

  type BankAccountTransaction {
    date: String
    ref: String
    concept: String
    amount: String
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
  }

  extend type Query {
    getBankAccount(id: ID!): BankAccount
    getBankAccountTransactions(
      id: ID!
      limit: Int
      offset: Int
    ): [BankAccountTransaction]
    getBankAccounts(limit: Int, offset: Int): [BankAccount]
  }

  extend type Mutation {
    newBankAccount(input: BankAccountInput!): String
    updateBankAccount(input: BankAccountInput!): String
    deleteBankAccount(id: ID!): String
  }
`;
