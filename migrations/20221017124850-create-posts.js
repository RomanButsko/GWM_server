'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Chats',
        'postId',
        {
          type: Sequelize.INTEGER,
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


//Sequelize.ARRAY(Sequelize.INTEGER),