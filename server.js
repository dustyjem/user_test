const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors'); // Import the 'cors' package

const contactsRouter = require('./routes/contacts');

app.use(express.json()); // Parse JSON-encoded bodies
app.use('/contacts', contactsRouter);

// Enable CORS for all routes
app.use(cors());

// Serve the HTML file containing the form
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'resume_input.html'));
});

// Start the server
const mongodb = require('./db/db');

mongodb.initDb((err) => {
  if (err) {
    console.error('Error initializing database:', err);
    process.exit(1);
  }

  app.listen(3535, function () {
    console.log('Server is running on http://localhost:3535');
  });
});
