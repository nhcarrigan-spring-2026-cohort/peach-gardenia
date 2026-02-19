const { Sequelize } = require('sequelize');

let dbConfig;
try {
  dbConfig = require('./config/db.config');
} catch (error) {
  dbConfig = require('./config/db.config.js.example');
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './dev.sqlite',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  retry: {
    match: [
      /SQLITE_BUSY/,
      Sequelize.ConnectionError,
    ],
    max: 3,
  },
  logging: false,
  // logging: (...msg) => console.log(msg),

});

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