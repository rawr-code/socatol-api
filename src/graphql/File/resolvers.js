const fs = require('fs');
const mkdirp = require('mkdirp');
const shortid = require('shortid');
const xlsx = require('xlsx');

// const { model } = require('../../models');

const UPLOAD_DIR = './extractos-bancarios';

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

const processUpload = async upload => {
  const { createReadStream, filename, mimetype } = await upload;
  let stream = createReadStream();
  let buffers = [];
  stream.on('data', function(data) {
    buffers.push(data);
  });
  stream.on('end', function() {
    var buffer = Buffer.concat(buffers);
    var workbook = xlsx.read(buffer); // works
    console.log(workbook);
    let sheet_name_list = workbook.SheetNames;
    let xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    console.log(xlData);
  });

  // console.log(stream);
  // const { id, path } = await storeFS({ stream, filename });
  // console.log({ id, path });

  // const workbook = xlsx.readFile(stream);
  // let sheet_name_list = workbook.SheetNames;
  // let xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  // // console.log(xlData);
  // console.log(Object.keys(xlData[0]));

  return upload;
  // return storeDB({ id, filename, mimetype, path });
};

module.exports = {
  Query: {},
  Mutation: {
    singleUpload: async (root, { file }) => processUpload(file)
  }
};
