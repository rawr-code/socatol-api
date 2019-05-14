const { BankAccount, BankTransaction, Invoice } = require('../models');

const { bankAccountTypes } = require('../graphql/subscriptionsTypes');

module.exports = {
  bankAccount: async (root, { id }) => {
    try {
      const bankAccount = await BankAccount.findById(id);

      return bankAccount;
    } catch (error) {
      console.log(error);
    }
  },
  bankAccountTransactions: async (root, { id, limit, offset }) => {
    try {
      const transactions = await BankTransaction.find({ bankAccount: id })
        .limit(limit)
        .skip(offset);

      return transactions;
    } catch (error) {
      console.log(error);
    }
  },
  bankAccountTransactionConciliate: async (root, { input, limit, offset }) => {
    try {
      console.log(input);
      let transaction = await BankTransaction.findById(input.transactionId);
      let invoice = await Invoice.findById(input.invoiceId);
      transaction.invoices.push(invoice);
      await transaction.save();
      invoice.status = 'CONCILIADO';
      invoice.transactions.push(transaction);
      await invoice.save();

      return 'exito';
    } catch (error) {
      console.log(error);
    }
  },
  bankAccounts: async (root, { limit, offset }) => {
    try {
      const bankAccounts = await BankAccount.find({})
        .limit(limit)
        .skip(offset);

      return bankAccounts;
    } catch (error) {
      console.log(error);
    }
  },
  addBankAccount: async (pubsub, { input }) => {
    try {
      const bankAccount = new BankAccount({
        name: input.name,
        bank: input.bank,
        type: input.type,
        number: input.number
      });

      await bankAccount.save();

      pubsub.publish(bankAccountTypes.ADD, { bankAccountAdded: bankAccount });

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
  addBankAccountTransactions: async (root, { input }) => {
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
};
