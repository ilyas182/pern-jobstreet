const express = require('express');
const cors = require('cors')
const pool = require('./config/db')

const app = express();
app.use(cors());
app.use(express.json());

// Register the tweet routes
// app.use('/tweets', tweetsRoutes);
//create tweet
// app.use("/api/home", tweetsRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});