const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const publicDir = path.resolve(__dirname, 'public');

app.get('/download', (req, res) => {
  const filename = req.query.file; // User input from a query parameter

  if (!filename) {
    return res.status(400).send('Filename query parameter is required.');
  }

  const resolvedPath = path.resolve(publicDir, filename);

  // Ensure the resolved path is inside the public directory
  if (!resolvedPath.startsWith(publicDir + path.sep)) {
    return res.status(403).send('Access denied.');
  }

  if (fs.existsSync(resolvedPath)) {
    res.download(resolvedPath, (err) => {
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