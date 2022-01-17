'use strict';
const bcrypt=require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users',
    [
      {
      id: 1,
      firstName: 'admin',
      lastName:'admin',
      email:'admin@admin.com',
      username:'admin',
      password: bcrypt.hashSync('admin',10),
      admin: '1',
      createdAt: new Date(),
      updatedAt: new Date(),




  },
],
    );
},

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
