'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Users',
        'avatarPath',
        {
          type: Sequelize.STRING,
        },
        { transaction },
      );
      await queryInterface.addColumn(
        'Users',
        'aboutMe',
        {
          type: Sequelize.STRING,
        },
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    return;
  },
};
