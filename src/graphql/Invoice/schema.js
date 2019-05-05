const { gql } = require('apollo-server');

module.exports = gql`
  type Invoice {
    id: ID
    number: Int
    type: InvoiceTypes
    dateEmit: String
    paymentType: PaymentTypes
    note: String
    # user: User
    person: PersonalInformation
    products: [ProductInvoice]
  }

  type InvoiceList {
    id: ID
    number: Int
    dateEmit: String
    paymentType: PaymentTypes
    person: String
  }

  type ProductInvoice {
    name: String
    price: Int
    quantity: Int
  }

  type PersonInvoices {
    person: PersonalInformation
    invoices: [Invoice]
  }

  enum InvoiceTypes {
    COMPRA
    VENTA
  }

  enum PaymentTypes {
    EFECTIVO
    TRANSFERENCIA
  }

  input InvoiceInput {
    paymentType: PaymentTypes!
    note: String
    person: InvoicePersonInput!
    products: [InvoiceProductInput!]
  }

  input InvoicePersonInput {
    id: ID
    dni: Int
    name: String
    state: String
    municipality: String
    address: String
    phone: String
    email: String
  }

  input InvoiceProductInput {
    product: ID
    name: String
    price: Int
    quantity: Int!
  }

  input InvoiceUpdateInput {
    paymentType: PaymentTypes!
    note: String
  }

  extend type Query {
    getInvoice(id: ID!): Invoice
    getInvoices(limit: Int, offset: Int, type: InvoiceTypes): [InvoiceList]
  }

  extend type Mutation {
    newInvoice(input: InvoiceInput!, type: InvoiceTypes!): String
    updateInvoice(input: InvoiceUpdateInput!): String
    deleteInvoice(id: ID!): String
  }
`;
