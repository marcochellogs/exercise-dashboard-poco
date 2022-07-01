const userMethods = require('./utils/user.js');
const exerciseMethods = require('./utils/exercise.js');
const authMethods = require('./utils/auth.js');
const issueMethods = require('./utils/issue.js');

const express = require('express');
const bodyParser = require("body-parser");
const db = require('./models/index.js');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const payload = JSON.parse(req.body.payload)

  // to auth with secret
  //if (!authMethods.verifySecret(req, payload)) { res.status(401).send('unauthorized') }

  switch (req.get('X-GitHub-Event')) {
    case 'issues':
      if (payload.action === 'opened'){
        // associate the issue to the exercise
        // could the exercise not exist? Yes if they havent pushed, we create a dummy exercise
        const exercise = await exerciseMethods.findOrCreateExercise(payload)
        await issueMethods.openIssue(payload, exercise)
        console.log('')
        console.log('issue opened')
        console.log('')
      }
      if (payload.action === 'assigned' || payload.action === 'unassigned') {
        const exercise = await exerciseMethods.findOrCreateExercise(payload)
        await issueMethods.assignIssue(payload, exercise)
        console.log('')
        console.log('issue assigned')
        console.log('')
      }
      if (payload.action === 'labeled' || payload.action == 'unlabeled') {
        const exercise = await exerciseMethods.findOrCreateExercise(payload)
        await issueMethods.labelIssue(payload, exercise)
        console.log('')
        console.log('issue labeled')
        console.log('')
      }
      if (payload.action === 'closed') {
        await issueMethods.closeIssue(payload)
        console.log('')
        console.log('issue closed')
        console.log('')
      }
      break;
    case 'check_run':
      // for the score we only act when the owner commits
      if (!userMethods.checkOwnership(payload)) {
        console.log(`Do nothing, ${payload.sender.login} is not the user`)
        return res.status(200).send('do nothing')
      }
      if (payload.action === 'created') {
        const user = await userMethods.saveUserData(payload)
        // saves exercise and if exists updates user id and ex name
        await exerciseMethods.saveExerciseData(payload, user)

        console.log('')
        console.log(`repository owner username: ${payload.sender.login}`)
        console.log(`repository name ${payload.repository.name}`)
        console.log('')
      }
      if (payload.action === 'completed') {
        await exerciseMethods.updateExercise(payload)

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
  // get issues for exercises
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
