const fs = require('fs');
const mkdirp = require('mkdirp');
const shortid = require('shortid');
const xlsx = require('xlsx');

const { File } = require('../../db/models');

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

const processUpload = async upload => {
  try {
    const { createReadStream, filename, mimetype, encoding } = await upload;
    console.log(upload);
    let stream = createReadStream();
    let buffers = [];

    stream.on('data', function(data) {
      buffers.push(data);
    });

    stream.on('end', function() {
      var buffer = Buffer.concat(buffers);
      var workbook = xlsx.read(buffer);
      // console.log(workbook);
      let sheet_name_list = workbook.SheetNames;
      let xlData = xlsx.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      // console.log(xlData);
    });

    const { path } = await storeFS({ stream, filename });

    const file = new File({
      filename,
      mimetype,
      encoding,
      path
    });

    await file.save();
    console.log(file);
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
    singleUpload: async (root, { file }) => processUpload(file)
  }
};
