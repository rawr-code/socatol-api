const { gql } = require('apollo-server');

module.exports = gql`
  scalar Upload

  type File {
    filename: String
    mimetype: String
    encoding: String
    path: String
  }

  input FileInput {
    file: Upload!
    id: ID!
  }

  extend type Query {
    getFile(id: ID!): File
    getFiles(limit: Int, offset: Int): [File]
  }

  extend type Mutation {
    singleUpload(input: FileInput!): File
  }
`;
