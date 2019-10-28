require('dotenv').config();

const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const UserRoute = require("./routes/user");
// const passportSetup = require("./config/passport-setup");
// const keys = require("./config/keys");
// const cookieSession = require("cookie-session");
// const passport = require("passport");

mongoose
  .connect('mongodb://localhost/concerts', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app = express();

app.use(bodyParser.json());
app.use(cors({
  "origin": "*"
  // "credentials": true
}));

app.use(session({
  secret: "basic-auth-secret",
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000},
}));

// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: [keys.session.cookieKey]
// }));

// app.use(passport.initialize());
// app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", UserRoute);

const userRoute = require("./chatkit/connect")
app.use("/", userRoute);

app.listen(process.env.PORT, () => console.log(`App running on port ${process.env.PORT}`));
