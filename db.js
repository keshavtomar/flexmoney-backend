const { Client } = require('pg');

// Connection details for CockroachDB
const connectionConfig = {
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 26257, // CockroachDB default port
  ssl: {
    rejectUnauthorized: false, // For insecure connection, adjust in production
  },
};

// Create a new client
const client = new Client(connectionConfig);

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to CockroachDB');
    // You can perform database operations here
  })
  .catch(error => {
    console.error('Error connecting to CockroachDB:', error);
  })
  .finally(() => {
    // Close the connection when done
    client.end();
  });
