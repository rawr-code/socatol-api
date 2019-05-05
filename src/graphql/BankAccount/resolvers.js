const { BankAccount } = require('../../db/models');

module.exports = {
  Query: {
    getBankAccount: async (root, { id }) => {
      try {
        const bankAccount = await BankAccount.findById(id);

        return bankAccount;
      } catch (error) {
        console.log(error);
      }
    },
    getBankAccounts: async (root, { limit, offset }) => {
      try {
        const bankAccounts = await BankAccount.find({})
          .limit(limit)
          .skip(offset);

        return bankAccounts;
      } catch (error) {
        console.log(error);
      }
    }
  },
  Mutation: {
    newBankAccount: async (root, { input }) => {
      try {
        const bankAccount = new BankAccount({
          id: input.id,
          name: input.name,
          bank: input.bank,
          type: input.type,
          number: input.number,
          active: input.active
        });

        await bankAccount.save();

        return {
          success: true,
          error: false,
          message: 'Guardado con exito'
        };
      } catch (error) {
        console.log(error);
      }
    },
    updateBankAccount: async (root, { input }) => {
      try {
        await BankAccount.findOneAndUpdate({ _id: input.id }, input);

        return {
          success: true,
          error: false,
          message: 'Guardado con exito'
        };
      } catch (error) {
        console.log(error);
      }
    },
    deleteBankAccount: async (root, { id }) => {
      try {
        await BankAccount.findOneAndDelete({ _id: id });

        return {
          success: true,
          error: false,
          message: 'Eliminado con exito'
        };
      } catch (error) {
        console.log(error);
      }
    }
  }
};
