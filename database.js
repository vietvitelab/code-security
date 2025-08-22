// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Use in-memory database

db.serialize(() => {
  // Create a users table
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");

  // Insert some sample data
  const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
  stmt.run("Admin User", "admin@example.com");
  stmt.run("Regular User", "user@example.com");
  stmt.finalize();

  console.log('Database initialized with sample data.');
});

module.exports = db;