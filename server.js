const express = require('express');
const cors = require('cors')
const pool = require('./config/db')
const usersRoute = require('./routes/Users') 
const dashboardRoute = require('./routes/Dashboard');
const employerRoute = require('./routes/Employer');
const jobRoute = require('./routes/Jobs');
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//ROUTES
app.use("/api/main", usersRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/employer", employerRoute);
app.use("/api/job", jobRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});