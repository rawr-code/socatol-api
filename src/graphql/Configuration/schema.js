const { gql } = require('apollo-server');

module.exports = gql`
  type Configuration {
    iva: ConfigurationIVA
    invoice: ConfigurationInvoice
  }

  # Configuration Product Types
  type ConfigurationIVA {
    product: Int
  }

  # Configuration Invoice Types
  type ConfigurationInvoice {
    sale: ConfigurationSaleInvoice
    purchase: ConfigurationPurchaseInvoice
  }

  type ConfigurationSaleInvoice {
    number: Int
  }

  type ConfigurationPurchaseInvoice {
    number: Int
  }

  input ConfigurationProductIVA {
    iva: Int!
  }

  input ConfigurationSaleInvoiceNumber {
    number: Int!
  }

  input ConfigurationPurchaseInvoiceNumber {
    number: Int!
  }

  extend type Query {
    getConfiguration: Configuration
  }

  extend type Mutation {
    updateConfigurationProductIVA(input: ConfigurationProductIVA!): String!
    updateConfigurationSaleInvoiceNumber(
      input: ConfigurationSaleInvoiceNumber!
    ): String!
    updateConfigurationPurchaseInvoiceNumber(
      input: ConfigurationPurchaseInvoiceNumber!
    ): String!
  }
`;
