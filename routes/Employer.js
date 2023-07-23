const express = require('express');
const router = express.Router();
const employersCtrl = require('../controllers/Employer')
const validInfo = require('../middleware/Employer/validInfo');
const authorization = require('../middleware/Employer/authorization');

//routes
router.post('/register', validInfo, employersCtrl.create);
router.post('/login', validInfo, employersCtrl.login);
router.get("/verify", authorization, employersCtrl.verify);
router.post('/postJob', employersCtrl.postJob);
router.post('/postJobQn', employersCtrl.postJobQn);

module.exports = router;