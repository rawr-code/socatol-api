const fs = require('fs');
const mkdirp = require('mkdirp');
const shortid = require('shortid');
const xlsx = require('xlsx');

const { File, BankAccount, BankTransaction } = require('../models');

const UPLOAD_DIR = './docs';

const storeFS = ({ stream, filename }) => {
  // Ensure upload directory exists.
  mkdirp.sync(UPLOAD_DIR);

  const id = shortid.generate();
  const path = `${UPLOAD_DIR}/${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file.
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path }))
  );
};

const processUpload = async input => {
  try {
    let bankAccount = await BankAccount.findById(input.id);
    const fileConfig = input.config;
    let files = await input.files;
    files = await Promise.all(files);

    files.forEach(async file => {
      const { createReadStream, filename, mimetype, encoding } = file;

      let stream = createReadStream();
      let buffers = [];

      stream.on('data', function(data) {
        buffers.push(data);
      });

      stream.on('end', async function() {
        var buffer = Buffer.concat(buffers);
        var workbook = xlsx.read(buffer, { type: 'buffer', raw: true });
        // console.log(workbook);
        let sheet_name_list = workbook.SheetNames;
        let xlData = xlsx.utils.sheet_to_json(
          workbook.Sheets[sheet_name_list[0]],
          { header: 1, range: 1 }
        );
        // xlData = xlData.map(item => ({
        //   ...item,
        //   Importe: item[3].replace(/\./g, '').replace(',', '.')
        // }));

        let transactions = xlData.map(async item => {
          try {
            const date = item[fileConfig.date - 1];
            const ref = item[fileConfig.ref - 1];
            const concept = item[fileConfig.concept - 1];
            const amount = item[fileConfig.amount - 1];
            const balance = item[fileConfig.balance - 1];

            const transaction = new BankTransaction({
              date,
              ref,
              concept,
              amount,
              balance,
              bankAccount
            });

            await transaction.save();

            return transaction;
          } catch (err) {
            console.error(err);
          }
        });

        transactions = await Promise.all(transactions);

        await bankAccount.transactions.push(...transactions);

        const { path } = await storeFS({ stream, filename });

        const file = new File({
          filename,
          mimetype,
          encoding,
          path
        });

        await file.save();
        bankAccount.files.push(file);
        await bankAccount.save();
      });
    });

    return 'exito';
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  bankTransactionFile: async (root, { id }) => {
    try {
      const files = await File.findById(id);
      return files;
    } catch (error) {
      console.log(error);
    }
  },
  bankTransactionFiles: async (root, { limit, offset }) => {
    try {
      const files = await File.find({})
        .limit(limit)
        .skip(offset);

      return files;
    } catch (error) {
      console.log(error);
    }
  },
  uploadTransactions: async (root, { input }) => processUpload(input)
};
