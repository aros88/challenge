/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, ) {
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

  async down (queryInterface) {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
