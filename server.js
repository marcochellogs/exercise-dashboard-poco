const userMethods = require('./utils/user.js');
const exerciseMethods = require('./utils/exercise.js');
const authMethods = require('./utils/auth.js');
const issueMethods = require('./utils/issue.js');

const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const payload = JSON.parse(req.body.payload)

  //if (!authMethods.verifySecret(req, payload)) { res.status(401).send('unauthorized') }
  switch (req.get('X-GitHub-Event')) {
    case 'issues':
      if (payload.action === 'opened'){
        await issueMethods.createIssue()
      }
      if (payload.action === 'assigned') {
        await issueMethods.assignIssue()
      }
      if (payload.action === 'closed') {
        await issueMethods.closeIssue()
      }

      break;
    case 'check_run':
      if (!userMethods.checkOwnership(payload)) {
        console.log(`Do nothing, ${payload.sender.login} is not the user`)
        return res.status(200).send('do nothing')
      }

      if (payload.action === 'created') {
        const data = {
          username: payload.sender.login,
          exercise_repository_name: payload.repository.name,
          temp_password: payload.sender.login
        }
        await userMethods.saveUserData(data)
        await exerciseMethods.saveExerciseData(data)

        console.log('')
        console.log(`repository owner username: ${payload.sender.login}`)
        console.log(`repository name ${payload.repository.name}`)
        console.log('')
      }
      if (payload.action === 'completed' && payload.check_run.name === 'Autograding') {
        const data = {
          exercise_repository_name: payload.repository.name,
          action_name: payload.check_run.output.title,
          score: payload.check_run.output.summary,
          exercise_status: payload.check_run.conclusion
        }
        await exerciseMethods.updateExercise(data)

        console.log('')
        console.log(`repo name: ${payload.repository.name}`)
        console.log(`Score: ${payload.check_run.output.summary}`)
        console.log('')
      }
      break;
    default:
    res.send('nothing to do')
  }



  res.send('default response is 200, webhook received!')
})

app.get('/users', async (req, res) => {
  const users = await userMethods.getAllUsers()
  res.send(JSON.stringify(users))
})

app.get('/users/:username', async (req, res) => {
  const user = await userMethods.getUserByUsername(req.params.username)
  const exercises = await exerciseMethods.getAllExercisesByUsername(req.params.username)

  res.send(JSON.stringify({ user, exercises }))
})

app.get('/exercises', async (req, res) => {
  const exercises = await exerciseMethods.getAllExercises()
  res.send(JSON.stringify(exercises))
})

app.get('/issues', async (req, res) => {
  const issues = await issueMethods.getAllIssues()
  res.send(JSON.stringify(issues))
})

app.get('/issues/:username', async (req, res) => {
  const issues = await issueMethods.getIssuesByUsername(req.params.username)
  res.send(JSON.stringify(issues))
})

app.get('/issues/:username/:repo_name', async (req, res) => {
  const issues = await issueMethods.getIssuesByUsername(req.params.username, req.params.repo_name)
  res.send(JSON.stringify(issues))
})



app.listen(port, () => {
  console.log('')
  console.log(`Exercise dashboard listening on port ${port}`)
  console.log('')
})
