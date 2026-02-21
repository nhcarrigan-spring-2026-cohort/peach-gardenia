
const { sequelize } = require('../database.js');
const { DataTypes } = require('sequelize');
const Organization = require('../models/organization.js')(sequelize, DataTypes);

/**
 * @requires Model All models are exported and extend the Model class. It's interface can be found here https://sequelize.org/api/v6/class/src/model.js~model
 * 
 * @function
 * @type {{name: string, address: string, tel: string}} TOrg
 * @param orgs TOrg
 */
async function addSingleOrganization(org) {
  try {
    await Organization.create({ ...org, createdAt: new Date(), updatedAt: new Date() });
  }
  catch (error) {
    console.error(error.message);
  }
};

const org = {
  name: 'London Assembly',
  email: 'ldn_assembly@demo_mail.com',
  tel: '56789098765'
}

addSingleOrganization(org);