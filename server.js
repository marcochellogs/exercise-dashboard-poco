const userMethods = require('./utils/user.js');
const exerciseMethods = require('./utils/exercise.js');
const authMethods = require('./utils/auth.js');

const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  const payload = JSON.parse(req.body.payload)

  //if (!authMethods.verifySecret(req, payload)) { res.status(401).send('unauthorized') }

  if (payload.action === 'created') {
    const data = {
      username: payload.sender.login,
      exercise_repository_name: payload.repository.name,
      temp_password: payload.sender.login
    }
    await userMethods.saveUserData(data)
    await exerciseMethods.saveExerciseData(data)

    console.log('repository owner username:')
    console.log(payload.sender.login)
    console.log('repository name')
    console.log(payload.repository.name)
  }
  if (payload.action === 'completed' && payload.check_run.name === 'Autograding') {
    const data = {
      exercise_repository_name: payload.repository.name,
      action_name: payload.check_run.output.title,
      score: payload.check_run.output.summary,
      exercise_status: payload.check_run.conclusion
    }
    await exerciseMethods.updateExercise(data)

    console.log('repo name:')
    console.log(payload.repository.name)
    console.log('Score:')
    console.log(payload.check_run.output.summary)
  }
  res.send('default response is 200, webhook received!')
})

app.listen(port, () => {
  console.log(`Exercise dashboard listening on port ${port}`)
})
