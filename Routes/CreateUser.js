require("dotenv").config();

const express = require("express");
const Router = express.Router();
const { Client } = require("pg");

const connectionString = process.env.connectionstring;

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false, // For insecure connection, adjust in production
  },
});

Router.post("/createuser", (req, res) => {
  const userData = {
    name: req.body.name,
    email:req.body.email,
    age: req.body.age,
    password: req.body.password,
    enrollment_date: new Date(), // Replace with the actual enrollment date
  };

  // Connect to the database
  client
    .connect()
    .then(async() => {
      console.log("Connected to CockroachDB");

         // Insert user data into the users table
      const insertQuery =
      "INSERT INTO users (username, email, password, age, enrollment_date) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const insertValues = [
      userData.name,
      userData.email,
      userData.password,
      userData.age,
      userData.enrollment_date,
    ];

    client.query(insertQuery, insertValues);
    })
    .then((result) => {
      const insertedUser = result.rows[0];
      console.log("User inserted successfully:", insertedUser);
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      // Disconnect when done
      client
        .end()
        .then(() => {
          console.log("Disconnected from CockroachDB");
        })
        .catch((error) => {
          console.error("Error during disconnection:", error);
        });
    });
});

module.exports = Router;