const { gql } = require('apollo-server');

const typeDefs = gql`
  # Configuration
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

  input ConfigurationInvoiceNumber {
    number: Int!
  }

  # File
  type File {
    filename: String
    mimetype: String
    encoding: String
    path: String
  }

  input FileInput {
    config: FileConfigInput!
    files: [Upload!]!
    id: ID!
  }

  input FileConfigInput {
    concept: Int!
    date: Int!
    ref: Int!
    typeAmount: String!
    amount: Int
    debit: Int
    credit: Int
    balance: Int
  }
  # User
  type User {
    username: String
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

  input UserTokenInput {
    username: String!
    password: String!
  }

  # BankAccount
  type BankAccount {
    id: ID
    name: String
    bank: String
    type: BankAccountTypes
    number: String
  }

  type BankAccountTransaction {
    id: ID
    date: String
    ref: String
    concept: String
    amount: String
    balance: String
    status: String
    invoices: [Invoice]
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

  input BankAccountTransactionInput {
    bankAccount: ID!
    date: String!
    ref: String!
    concept: String!
    amount: String!
  }

  input bankAccountTransactionConciliateInput {
    transactionId: ID!
    invoiceId: ID!
  }

  # Invoice
  type Invoice {
    id: ID
    number: Int
    type: InvoiceTypes
    dateEmit: String
    paymentType: PaymentTypes
    note: String
    # user: User
    person: Person
    products: [ProductInvoice]
    status: String
    amount: Int
    transactions: [BankAccountTransaction]
  }

  type InvoiceList {
    id: ID
    number: Int
    dateEmit: String
    paymentType: PaymentTypes
    person: String
    status: String
    amount: Int
  }

  type ProductInvoice {
    name: String
    price: Int
    quantity: Int
  }

  type PersonInvoices {
    person: Person
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
    notes: String
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
    notes: String
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

  # Person
  type Person {
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

  enum PersonTypes {
    CLIENT
    SUPPLIER
  }

  input PersonInput {
    id: ID
    dni: Int!
    name: String!
    state: String!
    municipality: String!
    address: String!
    phone: String!
    email: String
  }

  # Warehouse
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

  # Product
  type Product {
    id: ID
    name: String
    price: Int
    iva: String
    stock: Int
    description: String
    warehouse: Warehouse
  }

  input ProductInput {
    id: ID
    name: String!
    price: Int!
    iva: String!
    stock: Int!
    warehouse: ID!
  }

  type Subscription {
    # BankAccount
    bankAccountAdded: BankAccount
    # Warehouse
    warehouseAdded: Warehouse
    # Product
    productAdded: Product
  }

  type Query {
    # Configuration
    configuration: Configuration

    # User
    user(id: ID!): User
    users(limit: Int, offset: Int): [User]
    authUser(token: String!): User

    # BankAccount
    bankAccount(id: ID!): BankAccount
    bankAccountTransactions(
      id: ID!
      limit: Int
      offset: Int
    ): [BankAccountTransaction]
    bankAccounts(limit: Int, offset: Int): [BankAccount]

    # BankTransaction
    bankTransactionFile(id: ID!): File
    bankTransactionFiles(limit: Int, offset: Int): [File]

    # Invoice
    invoice(id: ID!): Invoice
    invoices(limit: Int, offset: Int, type: InvoiceTypes): [InvoiceList]

    # Person
    person(id: ID!): Person
    persons(limit: Int, offset: Int, type: PersonTypes): [Person]

    # Warehouse
    warehouse(id: ID!): Warehouse
    warehouses(limit: Int, offset: Int): [Warehouse]

    # Product
    product(id: ID!): Product
    products(limit: Int, offset: Int): [Product]
  }

  type Mutation {
    # Configuration
    updateProductIVA(input: ConfigurationProductIVA!): String!
    updateSaleInvoiceNumber(input: ConfigurationInvoiceNumber!): String!
    updatePurchaseInvoiceNumber(input: ConfigurationInvoiceNumber!): String!

    # User
    addUser(input: UserInput!): String
    userToken(input: UserTokenInput!): Token!

    # BankAccount
    addBankAccount(input: BankAccountInput!): String
    updateBankAccount(input: BankAccountInput!): String
    deleteBankAccount(id: ID!): String
    addBankAccountTransactions(input: BankAccountTransactionInput!): String
    bankAccountTransactionConciliate(
      input: bankAccountTransactionConciliateInput!
    ): String
    # BankTransaction
    uploadTransactions(input: FileInput!): String

    # Invoice
    addInvoice(input: InvoiceInput!, type: InvoiceTypes!): String

    # Person

    # Warehouse
    addWarehouse(input: WarehouseInput!): String
    updateWarehouse(input: WarehouseInput!): String
    deleteWarehouse(id: ID!): String

    # Product
    addProduct(input: ProductInput!): String
    updateProduct(input: ProductInput!): String
    deleteProduct(id: ID!): String
  }
`;

module.exports = typeDefs;
