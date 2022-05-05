const express = require("express");
const PORT = 3001 || process.env;
const db = require("./db/connection");
const app = express();
const cTable = require("console.table");
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});


//module.exports = db;
