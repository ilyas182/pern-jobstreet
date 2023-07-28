const express = require('express');
const cors = require('cors')
const pool = require('./config/db')
const usersRoute = require('./routes/Users') 
const dashboardRoute = require('./routes/Dashboard');
const employerRoute = require('./routes/Employer');
const jobRoute = require('./routes/Jobs');
const app = express();
const favicon = require("serve-favicon")

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")))
//ROUTES
app.use("/api/main", usersRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/employer", employerRoute);
app.use("/api/job", jobRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});