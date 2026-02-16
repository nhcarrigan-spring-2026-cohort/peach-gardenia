const fs = require('fs');
var path = require('path')
const SqliteDialect = require("@sequelize/sqlite3");

module.exports = {
  development: {
    username: 'root',
    password: null,
    storage: 'dev.sqlite',
    database: path.resolve('../', 'dev.sqlite'),
    "mode": SqliteDialect.OPEN_READWRITE | SqliteDialect.OPEN_CREATE | SqliteDialect.OPEN_FULLMUTEX,
    // host: '127.0.0.1',
    port: 5432,
    dialect: 'sqlite',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    port: 3306,
    dialect: 'sqlite',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'sqlite',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};