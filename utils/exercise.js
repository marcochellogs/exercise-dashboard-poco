const db = require('../models/index.js');

const exerciseMethods = {
  updateExercise: async ({ exercise_repository_name, action_name, score, exercise_status }) => {
    try {
      const exercise = await db.Exercise.findOne({ where: { exercise_repository_name } })
      await exercise.update({ exercise_repository_name, action_name, score, exercise_status });
      return exercise;
    } catch (error) {
      console.log('')
      console.log('updateExercise error ', error)
    }
  },
  saveExerciseData: async({ username, exercise_repository_name }) => {
    try {
      const [exercise] = await db.Exercise.findOrCreate({
        where: { exercise_repository_name },
        defaults: {
          exercise_name: exercise_repository_name.replace(`-${username}`, ''),
          username,
          last_committ: new Date().toISOString()
        }
      });
      return exercise;
    } catch (error) {
      console.log('')
      console.log('saveExerciseData error ', error.parent)
    }
  },
  getAllExercises: async () => {
    return await db.Exercise.findAll()
  },
  getAllExercisesByUsername: async (username) => {
    return await db.Exercise.findAll({ where: { username } })
  }
}

module.exports = exerciseMethods
