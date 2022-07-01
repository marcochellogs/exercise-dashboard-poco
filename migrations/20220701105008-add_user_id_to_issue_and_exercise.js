'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Issues', 'ExerciseId', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('Exercises', 'UserId', {
        type: Sequelize.INTEGER,
      })
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
