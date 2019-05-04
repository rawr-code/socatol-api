const { gql } = require('apollo-server');

const typeDefs = gql`
  # Configuration Types

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

  # File Types
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  # DB Message Types
  type DBMessage {
    success: Boolean
    error: Boolean
    message: String
  }

  # User Types
  type User {
    id: ID
    username: String
    active: Boolean
  }

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

  # Invoice Types
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

  # Treasury Types
  type BankAccount {
    id: ID
    name: String
    bank: String
    type: BankAccountTypes
    number: String
    active: Boolean
  }

  type Movement {
    id: ID
    name: String
  }

  # Inventory Types
  type Warehouse {
    id: ID
    name: String
    description: String
    products: [Product]
  }

  type Product {
    id: ID
    name: String
    price: Int
    iva: String
    stock: Int
    description: String
    warehouse: Warehouse
  }

  # Enums

  # User Enums
  enum PersonalInformationTypes {
    CLIENT
    SUPPLIER
  }

  # Invoice Enums
  enum InvoiceTypes {
    PURCHASE
    SALE
  }

  enum PaymentTypes {
    EFECTIVO
    TRANSFERENCIA
  }

  # Treasury Enums
  enum BankAccountTypes {
    CURRENT
    SAVING
  }

  # Inputs

  # Configuration Inputs

  input ConfigurationProductIVA {
    iva: Int!
  }

  input ConfigurationSaleInvoiceNumber {
    number: Int!
  }

  input ConfigurationPurchaseInvoiceNumber {
    number: Int!
  }

  # User Inputs
  input UserInput {
    id: ID
    username: String!
    password: String!
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

  # Invoice Inputs
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

  # Treasury Inputs
  input BankAccountInput {
    id: ID
    name: String!
    bank: String!
    type: BankAccountTypes!
    number: String!
    active: Boolean!
  }

  # Inventory Inputs
  input WarehouseInput {
    id: ID
    name: String!
    description: String
  }

  input ProductInput {
    id: ID
    name: String!
    price: Int!
    iva: String!
    stock: Int!
    warehouse: ID!
  }

  type Query {
    # Configuration

    getConfiguration: Configuration
    # File
    uploads: [File]

    # User
    getUser(id: ID!): User
    getUsers(limit: Int, offset: Int): [User]

    # PersonalInformation
    getPersonalInformation(id: ID!): PersonalInformation
    getPersonalInformations(
      limit: Int
      offset: Int
      type: PersonalInformationTypes
    ): [PersonalInformation]

    # Invoice
    getInvoice(id: ID!): Invoice
    getInvoices(limit: Int, offset: Int, type: InvoiceTypes): [InvoiceList]

    # BankAccount
    getBankAccount(id: ID!): BankAccount
    getBankAccounts(limit: Int, offset: Int): [BankAccount]

    # Warehouse
    getWarehouse(id: ID!): Warehouse
    getWarehouses(limit: Int, offset: Int): [Warehouse]

    # Product
    getProduct(id: ID!): Product
    getProducts(limit: Int, offset: Int): [Product]
  }

  type Mutation {
    # Configuration
    updateConfigurationProductIVA(input: ConfigurationProductIVA!): String!
    updateConfigurationSaleInvoiceNumber(
      input: ConfigurationSaleInvoiceNumber!
    ): String!
    updateConfigurationPurchaseInvoiceNumber(
      input: ConfigurationPurchaseInvoiceNumber!
    ): String!

    # File
    singleUpload(file: Upload!): File!

    # User
    newUser(input: UserInput!): DBMessage
    updateUser(input: UserInput!): DBMessage
    deleteUser(id: ID!): DBMessage

    # PersonalInformation
    updatePersonalInformation(input: PersonalInformationInput!): DBMessage

    # Invoice
    newInvoice(input: InvoiceInput!, type: InvoiceTypes!): DBMessage
    updateInvoice(input: InvoiceUpdateInput!): DBMessage
    deleteInvoice(id: ID!): DBMessage

    # BankAccount
    newBankAccount(input: BankAccountInput!): DBMessage
    updateBankAccount(input: BankAccountInput!): DBMessage
    deleteBankAccount(id: ID!): DBMessage

    # Warehouse
    newWarehouse(input: WarehouseInput!): DBMessage
    updateWarehouse(input: WarehouseInput!): DBMessage
    deleteWarehouse(id: ID!): DBMessage

    # Product
    newProduct(input: ProductInput!): DBMessage
    updateProduct(input: ProductInput!): DBMessage
    deleteProduct(id: ID!): DBMessage
  }
`;

module.exports = typeDefs;
