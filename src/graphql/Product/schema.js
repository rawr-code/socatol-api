const { gql } = require('apollo-server');

module.exports = gql`
  type Product {
    id: ID
    name: String
    price: Int
    iva: String
    stock: Int
    description: String
    warehouse: Warehouse
  }

  type Message {
    id: String
    content: String
  }

  input ProductInput {
    id: ID
    name: String!
    price: Int!
    iva: String!
    stock: Int!
    warehouse: ID!
  }

  extend type Query {
    messages: [Message!]!
    getProduct(id: ID!): Product
    getProducts(limit: Int, offset: Int): [Product]
  }

  extend type Mutation {
    newProduct(input: ProductInput!): String
    updateProduct(input: ProductInput!): String
    deleteProduct(id: ID!): String
  }
`;
