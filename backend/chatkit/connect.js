const Chatkit = require('@pusher/chatkit-server');
const express = require("express");
const app = express();

const chatkit = new Chatkit.default({
    instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR,
    key: process.env.CHATKIT_SECRET_KEY,
  });

app.post('/users', (req, res) => {
    debugger    
    const { username } = req.body;

    chatkit
      .createUser({
        id: username,
        name: username,
      })
      .then(() => {
        res.json(username);
      })
      .catch(err => {
        if (err.error === 'services/chatkit/user_already_exists') {
          console.log(`User already exists: ${username}`);
          res.json(username);
        } else {
          res.status(err.status).json(err);
        }
      });
  });

app.post('/authenticate', (req, res) => {
    const authData = chatkit.authenticate({
      userId: req.query.user_id,
    });
    res.status(authData.status).send(authData.body);
  });

  module.exports = app;