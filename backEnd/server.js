const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const superAdminRoutes = require('./routes/superAdminRoutes');

app.use(bodyParser.json()); // Middleware to parse JSON body
app.use('/admin', superAdminRoutes); // Mount the SuperAdmin routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});