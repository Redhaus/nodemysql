// load app server using express
const express = require("express");
const app = express();
const morgan = require("morgan");

// helps parse html form data
const bodyParser = require("body-parser");

// IMPORT ROUTES
const router = require('./routes/user')

// SETUP USAGE MIDDLEWARE
// use parser with app
app.use(bodyParser.urlencoded({ extended: false }));

// allows you to serve up html files from public folder
app.use(express.static("./public"));

// use morgan
app.use(morgan("short"));

// use router
app.use(router);


// setup a route for an api, callback provides request and response
app.get("/", (req, res) => {
  res.send("hello from roooot");
});

// CONNECT TO SERVER localhost:3003 starts server and sets port
app.listen(3003, () => {
  console.log("Server is up and listening on 3003");
});
