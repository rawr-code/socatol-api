const { BankAccount, BankTransaction } = require('../../models');

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
    getBankAccountTransactions: async (root, { id, limit, offset }) => {
      try {
        const transactions = await BankTransaction.find({ bankAccount: id })
          .limit(limit)
          .skip(offset);

        return transactions;
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
          name: input.name,
          bank: input.bank,
          type: input.type,
          number: input.number
        });

        await bankAccount.save();

        return 'Guardado con exito';
      } catch (error) {
        console.log(error);
      }
    },
    updateBankAccount: async (root, { input }) => {
      try {
        await BankAccount.findOneAndUpdate({ _id: input.id }, input);

        return 'Actualizado con exito';
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
    },
    newBankAccountTransaction: async (root, { input }) => {
      try {
        const bankAccount = await BankAccount.findById(input.bankAccount);
        const transaction = new BankTransaction({
          bankAccount: input.bankAccount,
          date: input.date,
          ref: input.ref,
          concept: input.concept,
          amount: input.amount
        });

        await transaction.save();
        bankAccount.transactions.push(transaction);
        await bankAccount.save();

        return 'Registrado con exito';
      } catch (error) {
        console.log(error);
      }
    }
  }
};
