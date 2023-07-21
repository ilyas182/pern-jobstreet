const express = require('express');
const validInfo = require('../middleware/validInfo');
const router = express.Router();
const employersCtrl = require('../controllers/Employer')

//routes
router.post('/register', employersCtrl.create);

module.exports = router;