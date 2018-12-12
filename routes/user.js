// will contain all user routes

const express = require('express');
const mysql = require("mysql");
const router = express.Router();

// ceate pool to make db connection more efficient
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    database: "mysql_basics"
})


// connect to db function
function getConnection() {
    return pool;
}


router.get('/messages', (req, res) => {
    console.log("messages route");
    res.end();
})



// POST ROUTES
// Adding post route for creating user
router.post("/user_create", (req, res) => {
    // bodyparsers allows you to get data this way
    const firstName = req.body.create_first_name;
    const lastName = req.body.create_last_name;
  
    // create query string the ?? are replaced by the array elements in query   
    const queryString = "INSERT INTO users (first_name, last_name) VALUES ( ? , ? )"
    const connection = getConnection();
  
    connection.query(queryString, [firstName, lastName], (err, results, field) => {
  
          if(err){
              console.log("Server Error: " + err);
              res.sendStatus(500);
              return
          }
  
          console.log("Added User: " + results.insertId);
          res.end();
    })
  
  });



// GET ROUTES
// setup a route for an api
router.get("/users", (req, res) => {
    const queryString = "SELECT * FROM users";
  
    //make connection to db
    const connection = getConnection();
  
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("error with query: " + err);
        res.sendStatus(500);
        return;
      }
  
      res.json(rows);
    });
  });



  
  // set up id based api route
  router.get("/user/:id", (req, res) => {
    // setup query vars
    const queryString = "SELECT * FROM users WHERE id = ?";
    const userId = req.params.id; // this is id from url
  
    // get to db
    const connection = getConnection();
  
    // query db connection
    connection.query(queryString, [userId], (err, rows, fields) => {
      if (err) {
        console.log("failed to query users: " + err);
        res.sendStatus(500);
        return;
      }
  
      // custom formatting
      const users = rows.map(row => {
        return { firstName: row.first_name, lastName: row.last_name };
      });
  
      res.json(users);
    });
  });
  

module.exports = router;