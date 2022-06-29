'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      exercise_repository_name: {
        type: Sequelize.STRING
      },
      exercise_name: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      last_committ: {
        type: Sequelize.DATE
      },
      action_name: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.STRING
      },
      exercise_status: {
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
    await queryInterface.dropTable('Exercises');
  }
};