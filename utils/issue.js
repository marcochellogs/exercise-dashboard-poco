const db = require('../models/index.js');

const exerciseMethods = {
  openIssue: async ({ exercise_repository_name, action_name, score, exercise_status }) => {
    try {
      const issue = await db.Issue.create(data)
      return issue;
    } catch (error) {
      console.log('')
      console.log('openIssue error ', error)
    }
  },
  assignIssue: async ({ username, exercise_repository_name, issue_name }) => {
    try {
      const [issue] = await db.Issue.findOrCreate({
        where: { exercise_repository_name, issue_url },
        defaults: {
          issue_url,
          username,
          last_committ: new Date().toISOString()
        }
      });
      return await issue.update({});
    } catch (error) {
      console.log('')
      console.log('assignIssue error ', error.parent)
    }
  },
  closeIssue: async ({ username, exercise_repository_name }) => {
    try {
      const issue = await db.Issue.findOne({
        where: { exercise_repository_name, issue_url }
      });
      return await issue.update({});
    } catch (error) {
      console.log('')
      console.log('closeIssue error ', error.parent)
    }
  },
  getAllIssues: async () => {
    return await db.Issue.findAll()
  },
  getIssuesByExecise: async (exercise_repository_name) => {
    return await db.Issue.findAll({ where: { exercise_repository_name } })
  },
  getIssuesByUsername: async (username) => {
    return await db.Issue.findAll({ where: { username } })
  }
}

module.exports = exerciseMethods
