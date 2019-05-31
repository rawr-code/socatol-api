const { Backup } = require('../models');

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');
const fs = require('fs');

const mongoose = require('mongoose');
const { MONGO_URL, MONGO_PORT, DB_NAME } = process.env;
const mongoUrl = `mongodb://administrador:clave1234@${MONGO_URL}:${MONGO_PORT}/${DB_NAME}`;

const dbOptions = {
  user: 'administrador',
  pass: 'clave1234',
  host: 'localhost',
  port: 27017,
  database: 'socatol-api-graphql',
  autoBackup: true,
  removeOldBackup: true,
  keepLastDaysBackup: 2,
  autoBackupPath: 'mongoBackups'
};

const date = new Date();

const stringToDate = function(dateString) {
  return new Date(dateString);
};

const currentDate = stringToDate(date);

const newBackupDir =
  currentDate.getFullYear() +
  '-' +
  (currentDate.getMonth() + 1) +
  '-' +
  currentDate.getDate() +
  '-time-' +
  currentDate.getHours() +
  '-' +
  currentDate.getMinutes() +
  '-' +
  currentDate.getSeconds();

const newBackupPath = `${dbOptions.autoBackupPath}/${newBackupDir}`;

const RestoreBackup = async path => {
  const { stdout, stderr } = await exec(`mongorestore -d ${DB_NAME} ${path}`);

  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
};

const GenerateBackup = async () => {
  await exec(`mongodump -d ${DB_NAME} -o ${newBackupPath}`);
};

module.exports = {
  backups: async () => {
    try {
      let bakps = [];
      const data = await Backup.find({});

      data.forEach(item => {
        const text = item.path.split('/');
        const datetime = text[1].split('-time-');
        bakps.push({
          id: item._id,
          date: datetime[0],
          time: datetime[1]
        });
      });

      return bakps;
    } catch (error) {
      console.log(error);
    }
  },
  backup: async () => {
    try {
      const newBackup = new Backup({
        path: `${newBackupPath}/${DB_NAME}`
      });

      await newBackup.save();

      mongoose.disconnect();

      await GenerateBackup();

      mongoose.connect(mongoUrl, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true
      });

      return 'Generando...';
    } catch (error) {
      console.log(error);
    }
  },
  restore: async (root, { id }) => {
    try {
      const bak = await Backup.findById(id);
      mongoose.disconnect();

      RestoreBackup(bak.path);

      mongoose.connect(mongoUrl, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true
      });

      return 'restaurando...';
    } catch (error) {
      console.log(error);
    }
  }
};
