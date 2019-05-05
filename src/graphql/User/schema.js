const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    username: String
    password: String
    role: String
    active: Boolean
  }

  type Token {
    token: String
  }

  enum userTypes {
    CONSULTOR
    CONTABLE
  }

  input UserInput {
    username: String!
    password: String!
    role: userTypes!
    active: Boolean
  }

  input AuthUserInput {
    username: String!
    password: String!
  }

  extend type Query {
    getUser(id: ID!): User
    getUsers(limit: Int, offset: Int): [User]
  }

  extend type Mutation {
    newUser(input: UserInput!): String
    authUser(input: AuthUserInput!): Token!
  }
`;
