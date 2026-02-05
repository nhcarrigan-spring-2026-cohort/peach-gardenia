const { Sequelize } = require('sequelize');

let dbConfig;
try {
  dbConfig = require('./config/db.config');
} catch (error) {
  dbConfig = require('./config/db.config.js.example');
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  pool: dbConfig.pool,
  retry: {
    match: [
        /SQLITE_BUSY/,
        Sequelize.ConnectionError,
    ],
    max: 3,
  },
  logging: false,

});

async function connectToDatabase(){
try {
  await sequelize.authenticate();
  console.log('Connection has been established');
} catch (error) {
  console.error('Unable to connect to the database:', error);
  process.exit(1);
}}

module.exports = { sequelize, connectToDatabase };


// Test connection independently by running database.js
if (require.main === module) {
  connectToDatabase();
}