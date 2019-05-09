const fs = require('fs');
const mkdirp = require('mkdirp');
const shortid = require('shortid');
const xlsx = require('xlsx');

const { File, BankAccount, BankTransaction } = require('../../models');

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
    const { createReadStream, filename, mimetype, encoding } = await input.file;
    let bankAccount = await BankAccount.findById(input.id);

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
        workbook.Sheets[sheet_name_list[0]]
        // { header: 1 }
      );
      // xlData = xlData.map(item => ({
      //   ...item,
      //   Importe: item.Importe.replace(/\./g, '').replace(',', '.')
      // }));

      let transactions = xlData.map(async item => {
        const transaction = new BankTransaction({
          date: item.Fecha,
          ref: item.Referencia,
          concept: item.Descripción,
          amount: item.Importe,
          bankAccount
        });

        await transaction.save();

        return transaction;
      });

      transactions = await Promise.all(transactions);
      await bankAccount.transactions.push(...transactions);
    });

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

    console.log(bankAccount);
    return file;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Query: {
    getFile: async (root, { id }) => {
      try {
        const files = await File.findById(id);
        return files;
      } catch (error) {
        console.log(error);
      }
    },
    getFiles: async (root, { limit, offset }) => {
      try {
        const files = await File.find({})
          .limit(limit)
          .skip(offset);

        return files;
      } catch (error) {
        console.log(error);
      }
    }
  },
  Mutation: {
    singleUpload: async (root, { input }) => processUpload(input)
  }
};
