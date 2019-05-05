const { gql } = require('apollo-server');

module.exports = gql`
  type PersonalInformation {
    id: ID
    dni: Int
    name: String
    state: String
    municipality: String
    address: String
    phone: String
    email: String
    invoices: PersonalInvoices
  }

  type PersonalInvoices {
    sale: [Invoice]
    purchase: [Invoice]
  }

  enum PersonalInformationTypes {
    CLIENT
    SUPPLIER
  }

  input PersonalInformationInput {
    id: ID
    dni: Int!
    name: String!
    state: String!
    municipality: String!
    address: String!
    phone: String!
    email: String
  }

  extend type Query {
    getPersonalInformation(id: ID!): PersonalInformation
    getPersonalInformations(
      limit: Int
      offset: Int
      type: PersonalInformationTypes
    ): [PersonalInformation]
  }

  extend type Mutation {
    updatePersonalInformation(input: PersonalInformationInput!): String
  }
`;
