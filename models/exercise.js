'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Exercise.init({
    exercise_repository_name: DataTypes.STRING,
    exercise_name: DataTypes.STRING,
    username: DataTypes.STRING,
    last_committ: DataTypes.DATE,
    action_name: DataTypes.STRING,
    score: DataTypes.STRING,
    exercise_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};