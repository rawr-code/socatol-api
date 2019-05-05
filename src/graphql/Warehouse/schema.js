const { gql } = require('apollo-server');

module.exports = gql`
  type Warehouse {
    id: ID
    name: String
    description: String
    products: [Product]
  }

  input WarehouseInput {
    id: ID
    name: String!
    description: String
  }

  extend type Query {
    getWarehouse(id: ID!): Warehouse
    getWarehouses(limit: Int, offset: Int): [Warehouse]
  }

  extend type Mutation {
    newWarehouse(input: WarehouseInput!): String
    updateWarehouse(input: WarehouseInput!): String
    deleteWarehouse(id: ID!): String
  }
`;
