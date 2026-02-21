const { sequelize } = require("../database.js");

async function selectAll(table) {
  const [results, metadata] = await sequelize.query(`SELECT * FROM ${table};`);
  console.log(results);
  return results;
}

selectAll('organizations')

module.exports = selectAll;