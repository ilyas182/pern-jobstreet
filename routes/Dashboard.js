const express = require('express');
const router = express.Router();
const pool = require("../config/db");
const authorization = require('../middleware/authorization');
const dashboardController = require("../controllers/Dashboard");

router.get("/", authorization, dashboardController.authorize);

module.exports = router;