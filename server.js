// In this exercise you will setup a server
// to rerceive and save changes to a github repository.
// With a tool like this you can analyze how people
// are working on a repository or even an entire organization.
// This data can later be visualized with react on the frontend

// We will use express to listen and respond to external calls
const express = require('express')
const bodyParser = require("body-parser");
// we call express to generate an instance of Express application
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
// The bodyparser allows us to parse the response and extract the body
app.use(bodyParser.json());

// Before processing the call we should make sure that it is ours
// We shoud authenticate with a secret
// is there an npm package that coukd help you do this?

app.post('/webhook', (req, res) => {
  const payload = JSON.parse(req.body.payload)
  if (payload.action === 'created') {
    // The autograding action has been created.
    // Save the user if it doesnt already exist
    // the username is the unique identifier
    // Do you still need an id?
    console.log('repository owner username:')
    console.log(payload.sender.login)
    console.log('repository name')
    console.log(payload.repository.name)
  }
  if (payload.action === 'completed' && payload.check_run.name === 'Autograding') {
    // Now that you saved the repository name
    // Search on the db using the username
    // Now that you got the
    console.log('repo name:')
    console.log(payload.repository.name)
    console.log('Action name:')
    console.log(payload.check_run.output.title)
    console.log('Score:')
    console.log(payload.check_run.output.summary)
  }
  // let's respond to the webhook
  res.send('webhook received!')
})

// we need our server to listen on this channel
app.listen(port, () => {
  console.log(`Exercise dashboard listening on port ${port}`)
})

// Now run the app with the command: node server.js
// Open another terminal
// Run ngrok
// Opens a third terminal
// ---> Remove this comment to create a change <---
// Add, commit and push the exercise to trigger github actions
