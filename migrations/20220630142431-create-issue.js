'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Issues', {
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
      last_committ: {
        type: Sequelize.DATE
      },
      action_name: {
        type: Sequelize.STRING
      },
      issue_body: {
        type: Sequelize.STRING
      },
      issue_name: {
        type: Sequelize.STRING
      },
      issue_title: {
        type: Sequelize.STRING
      },
      issue_url: {
        type: Sequelize.STRING
      },
      issue_state: {
        type: Sequelize.STRING
      },
      issue_labels: {
        type: Sequelize.STRING
      },
      assignee: {
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
    await queryInterface.dropTable('Issues');
  }
};