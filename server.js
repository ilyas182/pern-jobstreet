const express = require('express');
const cors = require('cors')
const pool = require('./config/db')
const usersRoute = require('./routes/Users') 
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//ROUTES
app.use("/api/main", usersRoute)


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});