const resolvers = {
  Query: {
    getCliente: () => {
      return {
        nombre: 'Get Client',
        apellido: 'String',
        empresa: 'String',
        email: 'String'
      };
    }
  },
  Mutation: {
    crearCliente: () => {
      return {
        nombre: 'New Client',
        apellido: 'String',
        empresa: 'String',
        email: 'String'
      };
    }
  }
};

module.exports = resolvers;
