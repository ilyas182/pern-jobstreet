const express = require('express');
const validInfo = require('../middleware/validInfo');
const router = express.Router();
const employersCtrl = require('../controllers/Employer')

//routes
router.post('/register', employersCtrl.create);
router.post('/login', employersCtrl.login);

module.exports = router;