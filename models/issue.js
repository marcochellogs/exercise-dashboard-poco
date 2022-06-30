'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Issue.init({
    exercise_repository_name: DataTypes.STRING,
    exercise_name: DataTypes.STRING,
    last_committ: DataTypes.DATE,
    action_name: DataTypes.STRING,
    issue_body: DataTypes.STRING,
    issue_name: DataTypes.STRING,
    issue_title: DataTypes.STRING,
    issue_url: DataTypes.STRING,
    issue_state: DataTypes.STRING,
    issue_labels: DataTypes.STRING,
    assignee: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Issue',
  });
  return Issue;
};