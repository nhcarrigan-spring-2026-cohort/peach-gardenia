'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    try {

      await queryInterface.bulkInsert('Organizations', [
        {
          name: 'Bromley Council',
          email: 'info@bromley.demo_mail',
          tel: '01234567898',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'New Norway Village Council',
          email: 'info@newnorway.demo_mail',
          tel: '12345678987',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Cali Compton',
          email: 'info@calicompton.demo_mail',
          tel: '23456789876',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    }

    catch (error) {
      console.error(error)
    }

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */
    await queryInterface.bulkDelete('Organizations', null, {});
  }
};
