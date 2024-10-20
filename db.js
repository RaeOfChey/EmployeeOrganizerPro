const { Client } = require('pg');

// Create a new client instance
const client = new Client({
  user: 'postgres', // PostgreSQL user
  host: 'localhost',
  database: 'employee_tracker', // Database name
  password: 'Uraqt1006!', // PostgreSQL password
  port: 5432, // Default PostgreSQL port
});

// Connect to the database
client.connect();

module.exports = client;
