const { Sequelize } = require('sequelize');

const buildFlag = process.env.NODE_ENV;
let configFile;
try {
  configFile = require('./config/config.js');
} catch (error) {
  configFile = require('./config/db.config.js.example');
}

let dbConfig;
if (buildFlag === 'production') {
  dbConfig = configFile.production;
}
else if (buildFlag === 'test') {
  dbConfig = configFile.test;
}
else {
  dbConfig = configFile.development;
}

const sequelize = new Sequelize(dbConfig);

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

module.exports = { sequelize, connectToDatabase };


// Test connection independently by running database.js
if (require.main === module) {
  connectToDatabase();
}