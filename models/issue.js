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
      this.belongsTo(models.Exercise, { as: 'Exercise' });
    }
  }
  Issue.init({
    exercise_repository_name: DataTypes.STRING,
    last_committ: DataTypes.DATE,
    issue_body: DataTypes.STRING,
    issue_title: DataTypes.STRING,
    issue_url: DataTypes.STRING,
    issue_state: DataTypes.STRING,
    issue_labels: DataTypes.STRING,
    assignee: DataTypes.STRING,
    ExerciseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Issue',
  });
  return Issue;
};
