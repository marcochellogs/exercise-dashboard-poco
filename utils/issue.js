const db = require('../models/index.js');

const exerciseMethods = {
  openIssue: async (payload, exercise) => {
    try {
      const [issue] = await db.Issue.findOrCreate({
        where: { issue_url: payload.issue.url },
        defaults: {
          issue_url: payload.issue.url,
          last_committ: new Date().toISOString(),
          issue_body: payload.issue.body ,
          issue_title: payload.issue.title,
          issue_state: payload.issue.state,
          issue_labels: JSON.stringify(payload.issue.labels.map((e) => e.name)),
          exercise_repository_name: payload.repository.name,
          ExerciseId: exercise.id
        }
      });
      return issue;
    } catch (error) {
      console.log('')
      console.log('openIssue error ', error)
    }
  },
  assignIssue: async (payload) => {
    try {
      const [issue] = await db.Issue.findOrCreate({
        where: { issue_url: payload.issue.url },
        defaults: {
          issue_url: payload.issue.url,
          last_committ: new Date().toISOString(),
          issue_body: payload.issue.body,
          issue_title: payload.issue.title,
          issue_state: payload.issue.state,
          exercise_repository_name: payload.repository.name
        }
      });
      return await issue.update({ assignee: payload.issue.assignee.login });
    } catch (error) {
      console.log('')
      console.log('assignIssue error ', error)
    }
  },
  labelIssue: async (payload) => {
    try {
      const [issue] = await db.Issue.findOrCreate({
        where: { issue_url: payload.issue.url },
        defaults: {
          issue_url: payload.issue.url,
          last_committ: new Date().toISOString(),
          issue_body: payload.issue.body,
          issue_title: payload.issue.title,
          issue_state: payload.issue.state,
          exercise_repository_name: payload.repository.name
        }
      });
      return await issue.update({ issue_labels: JSON.stringify(payload.issue.labels.map((e) => e.name)) });
    } catch (error) {
      console.log('')
      console.log('labelIssue error ', error)
    }
  },
  closeIssue: async (payload) => {
    try {
      const issue = await db.Issue.findOne({
        where: { issue_url: payload.issue.url }
      });
      return await issue.update({ issue_state: payload.issue.state });
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
