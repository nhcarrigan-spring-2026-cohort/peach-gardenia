'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      row_1: {
        type: Sequelize.STRING
      },
      row_2: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state_county: {
        type: Sequelize.STRING
      },
      zip_code: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      locale: {
        type: Sequelize.STRING
      },
      address_type: {
        type: Sequelize.ENUM('headquarters', 'billing', 'shipping', 'misc')
      },
      local_email: {
        type: Sequelize.STRING
      },
      local_tel: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    console.log(await queryInterface.sequelize.query("select * from organizations"));
    // await queryInterface.sequelize.query("DROP TYPE IF EXISTS 'enum_Addresses_address_type';");
    await queryInterface.dropTable('Addresses');
    // https://sequelize.org/docs/v6/other-topics/dialect-specific-things/#data-type-arrayenum---postgresql-only
  }
};