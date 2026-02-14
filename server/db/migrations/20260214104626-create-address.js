'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organisation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Organisations',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Addresses');
  }
};