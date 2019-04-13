const importSchema = require('graphql-import').importSchema;
const schema = importSchema('src/schemas/schema.graphql');

module.exports = schema;
