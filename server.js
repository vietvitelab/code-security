const express = require('express');
const db = require('./database.js');
const app = express();
const PORT = 3000;

app.get('/user', (req, res) => {
  const userId = req.query.id; // User input from query parameter

  if (!userId) {
    return res.status(400).send('User ID is required.');
  }

  const query = "SELECT * FROM users WHERE id = " + userId;

  console.log(`Executing query: ${query}`);

  db.get(query, [], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (row) {
      res.json(row);
    } else {
      res.status(404).send('User not found.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
