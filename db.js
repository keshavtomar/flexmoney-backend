require("dotenv").config();

const { Client, Pool } = require("pg");
//Pool allows to establish connection without reestablish it on every request which reduces our cost and resources of cockroachDB
const { parse } = require("pg-connection-string");
const { errors } = require("pg-promise");

const connectionString = process.env.connectionstring;

const connect = async () => {
  console.log(connectionString);
  const client = await new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false, // For insecure connection, adjust in production
    },
  });

  // Connect to the database

  client
    .connect()
    .then(async () => {
      console.log("Connected to CockroachDB");

      // // Query to create the users table
      // const createTableUsers = `
      //   CREATE TABLE IF NOT EXISTS users (
      //     user_id SERIAL PRIMARY KEY,
      //     username VARCHAR(255) NOT NULL,
      //     email VARCHAR(255) NOT NULL,
      //     password VARCHAR(255) NOT NULL,
      //     age INT,
      //     enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      //   );
      // `;

      // const createTableClasses = `
      //   CREATE TABLE IF NOT EXISTS classes (
      //       class_id SERIAL PRIMARY KEY,
      //       batch VARCHAR(20) NOT NULL
      //   );
      //   `;

      // const createTablePayments = `
      // CREATE TABLE IF NOT EXISTS payments (
      //   payment_id SERIAL PRIMARY KEY,
      //   user_id INT REFERENCES users(user_id),
      //   class_id INT REFERENCES classes(class_id),
      //   amount INT NOT NULL,
      //   payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      //   );
      //   `;

      // const paymentindex = `CREATE INDEX IF NOT EXISTS idx_user_id ON payments (user_id);`;

      // await client.query(createTableUsers).then(() => {
      //   console.log("Table created successfully");
      // }).catch((errors)=>{
      //   console.log("Error:"+errors);
      // })

      // await client.query(createTableClasses).then(()=>{
      //   console.log("Classes table created successfully");
      // }).catch((errors)=>{
      //   console.log("Error : "+errors);
      // })

      // await client.query(createTablePayments).then(()=>{
      //   console.log("Payments table created successfully");
      // }).catch((errors)=>{
      //   console.log("error: "+errors);
      // })

      // await client.query(paymentindex).then(()=>{
      //   console.log("Indexing on Payments table for user_id is done");
      // }).then((error)=>{
      //   console.log(error);
      // })

      //Droping table using pg

      const tableName = "payments";

      // Construct the SQL query to drop the table
      const dropTableQuery = `DROP TABLE IF EXISTS "${tableName}" CASCADE;`;

      // Execute the drop table query
      await client.query(dropTableQuery);
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      client.end();
    });
};

module.exports = connect;
