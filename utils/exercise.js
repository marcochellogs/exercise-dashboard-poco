const db = require('../models/index.js');

const exerciseMethods = {
  findOrCreateExercise: async (payload) => {
    try {
      const [exercise] = await db.Exercise.findOrCreate({
        where: { exercise_repository_name: payload.repository.name },
        defaults: {
          exercise_repository_name: payload.repository.name,
          last_committ: new Date().toISOString(),
        }
      });
      return exercise;
    } catch (error) {
      console.log('')
      console.log('findOrCreateExercise error ', error.parent)
    }
  },
  updateExercise: async (payload) => {
    try {
      const exercise = await db.Exercise.findOne({
        where: { exercise_repository_name: payload.repository.name }
      })
      await exercise.update({
        action_name: payload.check_run.output.title,
        score: payload.check_run.output.summary,
        exercise_status: payload.check_run.conclusion
      });
      return exercise;
    } catch (error) {
      console.log('')
      console.log('updateExercise error ', error)
    }
  },
  saveExerciseData: async(payload, user) => {
    try {
      const [exercise] = await db.Exercise.findOrCreate({
        where: { exercise_repository_name: payload.repository.name },
        defaults: {
          exercise_name: payload.repository.name.replace(`-${payload.sender.login}`, ''),
          username: payload.sender.login,
          last_committ: new Date().toISOString(),
          UserId: user.id
        }
      });
      if (!exercise.UserId) {
        await exercise.update({
          exercise_name: payload.repository.name.replace(`-${payload.sender.login}`, ''),
          username: payload.sender.login,
          UserId: user.id
        })
      }
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
