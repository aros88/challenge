'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tasks', [
      {
        title: 'First Task',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Second Task',
        completed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
