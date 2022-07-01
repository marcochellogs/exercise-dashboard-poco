'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Issues', 'issue_name'),
      queryInterface.removeColumn('Issues', 'action_name'),
      queryInterface.removeColumn('Issues', 'exercise_name'),
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
