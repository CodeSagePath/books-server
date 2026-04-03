// importing dependencies
const express = require("express");
const app = express();

// Server Configuration
const HOSTNAME = "127.0.0.1";
const PORT = "3000";

// Starting the server
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at http://${HOSTNAME}:${PORT}/`);
});
