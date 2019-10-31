require('dotenv').config();

const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const path = require("path")

mongoose
  .connect(process.env.NewDB, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app = express();

app.use(bodyParser.json());

if(process.env.ENVIRONMENT === "DEVELOPMENT"){
  app.use(cors({
    "origin": `${process.env.HOST}:${process.env.PORT}`,
    "credentials": true
  }));  
}

app.use(express.static(path.join(__dirname+"/public/build")))

app.use(session({
  secret: "basic-auth-secret",
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000},
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const UserRoute = require("./routes/user");
app.use("/auth", UserRoute);

const FavoriteRoute = require("./routes/favorites");
app.use("/auth", FavoriteRoute);

const FacebookRoute = require("./routes/facebook");
app.use("/auth", FacebookRoute);

const userRoute = require("./chatkit/connect")
app.use("/", userRoute);

app.listen(process.env.PORT, () => console.log(`App running on port ${process.env.PORT}`));
