
const { sequelize } = require('../database.js');
const { DataTypes } = require('sequelize');
const Organization = require('../models/organization.js')(sequelize, DataTypes);

/**
 * @requires Model All models are exported and extend the Model class. It's interface can be found here https://sequelize.org/api/v6/class/src/model.js~model
 * 
 * @function
 * @type {{name: string, address: string, tel: string}[]} TOrgs
 * @param orgs TOrgs
 */
async function addOrganizations(orgs) {
  orgs.forEach(async (org) => {
    try {
      await Organization.create({ ...org, createdAt: new Date(), updatedAt: new Date() });
    }
    catch (error) {
      console.error(error.message);
    }
  })
}

const orgs = [
  {
    name: 'Paris De Councillement',
    email: 'paris_councillors@bradford.demo_mail',
    tel: '34567890987'
  },
  {
    name: 'Stockholmies',
    email: 'holmiecarers@swedentogether.demo_mail',
    tel: '45678909876'
  },
]

addOrganizations(orgs);