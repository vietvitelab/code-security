const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.get('/download', (req, res) => {
  const filename = req.query.file; // User input from a query parameter

  if (!filename) {
    return res.status(400).send('Filename query parameter is required.');
  }
  const filePath = path.join(__dirname, 'public', filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
      }
    });
  } else {
    res.status(404).send('File not found.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});